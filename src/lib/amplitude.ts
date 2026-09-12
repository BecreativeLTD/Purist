// Amplitude removed — was adding ~1.2MB of JS and ~2.6-3.75s of main-thread
// blocking time (session replay + engagement bundles loaded for every visitor
// regardless of sample rate). track() is kept as a no-op so call sites don't
// need to be touched; it does nothing and ships no network request.
export function track(_event: string, _properties?: Record<string, unknown>) {}
