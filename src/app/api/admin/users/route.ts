import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase-server';
import { getAuthenticatedUserId } from '@/lib/auth-helper';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper: verify caller is super_admin (supports both cookie and Bearer token)
async function verifySuperAdmin(request: NextRequest) {
  const userId = await getAuthenticatedUserId(request);
  if (!userId) return null;

  const { data: crmUser } = await supabaseAdmin
    .from('crm_users')
    .select('role')
    .eq('id', userId)
    .single();

  return crmUser?.role === 'super_admin' ? { id: userId } : null;
}

// GET: List all CRM users with their aliases
export async function GET(request: NextRequest) {
  try {
    const caller = await verifySuperAdmin(request);
    if (!caller) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { data, error } = await supabaseAdmin
      .from('crm_users')
      .select('*, email_aliases(alias_email, display_name)')
      .order('created_at', { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Fetch auth emails for each user
    const userIds = data.map((u: any) => u.id);
    const { data: { users: authUsers } } = await supabaseAdmin.auth.admin.listUsers();
    const emailMap = new Map(authUsers.map((u: any) => [u.id, u.email]));

    const enriched = data.map((u: any) => ({
      ...u,
      email: emailMap.get(u.id) || '',
      alias_email: u.email_aliases?.alias_email ?? null,
    }));

    return NextResponse.json(enriched);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST: Create a new CRM user (auth user + crm_users profile)
export async function POST(request: NextRequest) {
  try {
    const caller = await verifySuperAdmin(request);
    if (!caller) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { email, password, full_name, role, email_alias_id } = await request.json();

    if (!email || !password || !full_name || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Create crm_users profile using service role (bypasses RLS)
    const { error: profileError } = await supabaseAdmin
      .from('crm_users')
      .insert({
        id: authData.user.id,
        full_name,
        role,
        email_alias_id: email_alias_id || null,
      });

    if (profileError) {
      // Rollback: delete auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: authData.user.id });
  } catch {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// PATCH: Update user profile (role, alias, active status)
export async function PATCH(request: NextRequest) {
  try {
    const caller = await verifySuperAdmin(request);
    if (!caller) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id, full_name, email, role, email_alias_id, is_active } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (full_name !== undefined) updates.full_name = full_name;
    if (role !== undefined) updates.role = role;
    if (email_alias_id !== undefined) updates.email_alias_id = email_alias_id || null;
    if (is_active !== undefined) updates.is_active = is_active;

    const { error } = await supabaseAdmin
      .from('crm_users')
      .update(updates)
      .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Update auth email if provided
    if (email) {
      const { error: emailError } = await supabaseAdmin.auth.admin.updateUserById(id, { email });
      if (emailError) {
        return NextResponse.json({ error: emailError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE: Soft-delete (deactivate) user
export async function DELETE(request: NextRequest) {
  try {
    const caller = await verifySuperAdmin(request);
    if (!caller) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Prevent self-deactivation
    if (id === caller.id) {
      return NextResponse.json({ error: 'Cannot deactivate yourself' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('crm_users')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to deactivate user' }, { status: 500 });
  }
}
