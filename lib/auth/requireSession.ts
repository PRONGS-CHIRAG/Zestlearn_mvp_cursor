import { cookies } from "next/headers";
import { verifySessionToken, type SessionPayload } from "./session";

const COOKIE_NAME = "zl_session";

/**
 * Read and verify the session cookie from an incoming request.
 * Returns the session payload or null if unauthenticated.
 */
export async function getSessionFromCookies(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Verify the user owns the requested workspace.
 * Returns the session on success, null if unauthorized.
 */
export async function requireOwnership(
  workspaceId: string
): Promise<SessionPayload | null> {
  const session = await getSessionFromCookies();
  if (!session) return null;
  if (session.workspaceId !== workspaceId) return null;
  return session;
}
