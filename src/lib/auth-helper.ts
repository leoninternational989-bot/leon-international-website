import { createClient as createServerClient } from '@/lib/supabase-server';
import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Extracts the authenticated user from either:
 * 1. Bearer token (mobile app) — Supabase JWT in Authorization header
 * 2. Cookie session (web app) — existing SSR auth
 *
 * Returns the user ID if authenticated, null otherwise.
 */
export async function getAuthenticatedUserId(
  request: NextRequest
): Promise<string | null> {
  // 1. Try Bearer token first (mobile app)
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    const { data } = await supabaseAdmin.auth.getUser(token);
    if (data?.user) return data.user.id;
  }

  // 2. Fall back to cookie session (web app)
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id || null;
  } catch {
    return null;
  }
}
