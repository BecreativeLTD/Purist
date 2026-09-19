import type { APIRoute } from 'astro';
import { recordLeadEvent } from '../../lib/lead-scoring';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// KIE AI (api.kie.ai) confirmed live against a real account key on 2026-09-19:
// - Auth: Authorization: Bearer <key>
// - Create: POST /api/v1/playground/createTask  { model, input: { prompt, aspect_ratio } }
//           -> { code, msg, data: { taskId } }
// - Poll:   GET  /api/v1/playground/recordInfo?taskId=...
//           -> { code, msg, data: { state, successFlag, resultJson, failMsg } }
//
// Every model below was individually createTask-tested and confirmed to accept
// a plain { prompt, aspect_ratio } input. KIE AI's Text-to-Image catalog has
// 31 models total; the remaining ~15 (Flux 2, Wan 2.7, Seedream 4.5/5-lite,
// 4o-image-api, GPT-Image 1.5) each need additional required fields
// (e.g. "resolution") not yet mapped — testing was stopped after the KIE AI
// account credit balance dropped to 5.5 during verification, to avoid
// draining it further. Extend this list once more credits are available.
const KIE_BASE_URL = 'https://api.kie.ai';
const MODELS: Record<string, { kieModel: string; label: string }> = {
  'nano-banana': { kieModel: 'google/nano-banana', label: 'Nano Banana' },
  'nano-banana-pro': { kieModel: 'nano-banana-pro', label: 'Nano Banana Pro' },
  'nano-banana-2': { kieModel: 'nano-banana-2', label: 'Nano Banana 2' },
  'nano-banana-2-lite': { kieModel: 'nano-banana-2-lite', label: 'Nano Banana 2 Lite' },
  'imagen4': { kieModel: 'google/imagen4', label: 'Imagen 4' },
  'imagen4-ultra': { kieModel: 'google/imagen4-ultra', label: 'Imagen 4 Ultra' },
  'imagen4-fast': { kieModel: 'google/imagen4-fast', label: 'Imagen 4 Fast' },
  'gpt-image-2': { kieModel: 'gpt-image-2-text-to-image', label: 'GPT Image 2' },
  'qwen-text-to-image': { kieModel: 'qwen/text-to-image', label: 'Qwen — Text to Image' },
  'qwen2-text-to-image': { kieModel: 'qwen2/text-to-image', label: 'Qwen2 — Text to Image' },
  'qwen3-text-to-image': { kieModel: 'qwen3/text-to-image', label: 'Qwen3 — Text to Image' },
  'qwen3-pro': { kieModel: 'qwen3/pro-text-to-image', label: 'Qwen3 Pro' },
  'seedream-v3': { kieModel: 'bytedance/seedream', label: 'Seedream V3' },
  'flux1-kontext': { kieModel: 'flux1-kontext', label: 'Flux Kontext' },
  'grok-imagine-text-to-image': { kieModel: 'grok-imagine/text-to-image', label: 'Grok Imagine — Text to Image' },
  'z-image': { kieModel: 'z-image', label: 'Z Image Turbo' },
};

function aspectRatioFor(aspectRatio: string): string {
  if (aspectRatio === 'portrait') return '9:16';
  if (aspectRatio === 'square') return '1:1';
  return '16:9';
}

async function pollTask(taskId: string, apiKey: string, maxAttempts = 30): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const res = await fetch(`${KIE_BASE_URL}/api/v1/playground/recordInfo?taskId=${taskId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) continue;
    const body = await res.json();
    const data = body?.data;
    if (!data) continue;
    if (data.successFlag === 1 || data.state === 'success') {
      const parsed = typeof data.resultJson === 'string' ? JSON.parse(data.resultJson) : data.resultJson;
      const url = parsed?.resultUrls?.[0] || data?.response?.resultUrls?.[0];
      if (url) return url;
      throw new Error('Generation completed but no image URL was returned.');
    }
    if (data.state === 'fail' || data.failCode) {
      throw new Error(data.failMsg || 'Generation failed upstream.');
    }
  }
  throw new Error('Generation timed out. Try again.');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, prompt, model, apiKey, aspectRatio } = body;

    if (!email || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'A valid email is required.' }), { status: 400 });
    }
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 3) {
      return new Response(JSON.stringify({ error: 'Describe the ad creative you want to generate.' }), { status: 400 });
    }
    const modelConfig = MODELS[model] || MODELS['nano-banana'];

    const keySource = apiKey && typeof apiKey === 'string' && apiKey.trim() ? 'byok' : 'purist';
    const kieKey = keySource === 'byok' ? apiKey.trim() : import.meta.env.KIE_API_KEY;

    if (!kieKey) {
      return new Response(JSON.stringify({
        error: "No API key available. Enter your own KIE AI key, or ask PURIST to enable the shared key for this demo.",
        code: 'NO_KEY',
      }), { status: 400 });
    }

    recordLeadEvent({
      email,
      eventType: 'ads_generator_use',
      source: 'ads_page',
      page: '/ads',
      category: `${modelConfig.label} (${keySource === 'byok' ? 'own key' : 'shared key'})`,
    }).catch(() => {});

    const createRes = await fetch(`${KIE_BASE_URL}/api/v1/playground/createTask`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kieKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelConfig.kieModel,
        input: {
          prompt: prompt.trim(),
          aspect_ratio: aspectRatioFor(aspectRatio),
        },
      }),
    });

    const createData = await createRes.json().catch(() => null);

    if (!createRes.ok || createData?.code !== 200) {
      const status = createRes.status;
      if (status === 401 || status === 403) {
        return new Response(JSON.stringify({ error: 'That API key was rejected by KIE AI. Double-check it and try again.', code: 'BAD_KEY' }), { status: 400 });
      }
      if (status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limited by KIE AI (20 requests/10s per account). Wait a moment and try again.' }), { status: 429 });
      }
      if (createData?.code === 402) {
        return new Response(JSON.stringify({ error: 'That KIE AI account is out of credits. Top up at kie.ai/billing or use your own key.', code: 'NO_CREDITS' }), { status: 402 });
      }
      console.error('[ads-generate] KIE AI create-task error', status, createData?.msg);
      return new Response(JSON.stringify({ error: createData?.msg || 'The generation request failed upstream.' }), { status: 502 });
    }

    const taskId = createData?.data?.taskId;
    if (!taskId) {
      return new Response(JSON.stringify({ error: 'No task ID came back from KIE AI.' }), { status: 502 });
    }

    const imageUrl = await pollTask(taskId, kieKey);

    return new Response(JSON.stringify({ success: true, imageUrl, model: modelConfig.label, keySource }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[ads-generate]', err);
    return new Response(JSON.stringify({ error: err?.message || 'Server error, please try again.' }), { status: 500 });
  }
};
