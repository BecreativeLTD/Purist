// Amplitude Analytics + Session Replay
// Client-side only — never runs server-side
import * as amplitude from '@amplitude/unified';

const API_KEY = 'c0b5f8fbe89fa65bdacff17a6513a297';

let _initialized = false;

export function initAmplitude() {
  if (_initialized || typeof window === 'undefined') return;

  amplitude.initAll(API_KEY, {
    analytics: { autocapture: true },
    sessionReplay: { sampleRate: 1 },
  });

  _initialized = true;
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  amplitude.track(event, properties);
}
