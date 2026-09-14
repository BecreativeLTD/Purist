import crypto from 'node:crypto';

// Server-side only. Authenticates as the Google service account already used
// for GSC/GA4 verification earlier in this project (scripts/service-account.json
// locally; GOOGLE_SERVICE_ACCOUNT_JSON env var in production, since Vercel
// can't read a gitignored local file). Implements the OAuth2 JWT-bearer flow
// by hand (RS256 sign via Node's built-in crypto) instead of pulling in the
// full googleapis package for two read-only report calls.

interface ServiceAccountCreds {
  client_email: string;
  private_key: string;
}

let cachedCreds: ServiceAccountCreds | null = null;

function getCreds(): ServiceAccountCreds | null {
  if (cachedCreds) return cachedCreds;
  const raw = import.meta.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    cachedCreds = { client_email: parsed.client_email, private_key: parsed.private_key };
    return cachedCreds;
  } catch {
    return null;
  }
}

function base64url(input: Buffer | string): string {
  return (Buffer.isBuffer(input) ? input : Buffer.from(input))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

const tokenCache = new Map<string, { token: string; expiresAt: number }>();

/** Exchanges the service account key for a short-lived OAuth2 access token, scoped to `scopes`. */
export async function getGoogleAccessToken(scopes: string[]): Promise<string | null> {
  const creds = getCreds();
  if (!creds) return null;

  const cacheKey = scopes.join(' ');
  const cached = tokenCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now() + 30_000) return cached.token;

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(JSON.stringify({
    iss: creds.client_email,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const signature = base64url(
    crypto.createSign('RSA-SHA256').update(`${header}.${claims}`).sign(creds.private_key)
  );
  const jwt = `${header}.${claims}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    console.error('[google-service-account] token exchange failed', await res.text());
    return null;
  }
  const data = await res.json();
  tokenCache.set(cacheKey, { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 });
  return data.access_token;
}
