// Single source of truth for who is allowed into the internal /pages/leads
// and /pages/dashboard admin tools. This site has no legitimate use for any
// other authenticated account, so authorization is a plain allowlist rather
// than a role/permissions system.
const ADMIN_EMAILS = ['hello@purist.online'];

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}
