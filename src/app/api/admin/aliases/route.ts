import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
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

// GET: List all aliases
export async function GET(request: NextRequest) {
  try {
    const caller = await verifySuperAdmin(request);
    if (!caller) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const { data, error } = await supabaseAdmin
      .from('email_aliases')
      .select('*')
      .order('alias_email');

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch aliases' }, { status: 500 });
  }
}

// POST: Create new alias
export async function POST(request: NextRequest) {
  try {
    const caller = await verifySuperAdmin(request);
    if (!caller) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const { alias_email, display_name } = await request.json();

    if (!alias_email || !display_name) {
      return NextResponse.json({ error: 'Email and display name required' }, { status: 400 });
    }

    const email = alias_email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('email_aliases')
      .insert({ alias_email: email, display_name: display_name.trim() })
      .select('id')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'This alias already exists' }, { status: 400 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch {
    return NextResponse.json({ error: 'Failed to create alias' }, { status: 500 });
  }
}

// PATCH: Update alias
export async function PATCH(request: NextRequest) {
  try {
    const caller = await verifySuperAdmin(request);
    if (!caller) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const { id, display_name, is_active } = await request.json();
    if (!id) return NextResponse.json({ error: 'Alias ID required' }, { status: 400 });

    const updates: Record<string, any> = {};
    if (display_name !== undefined) updates.display_name = display_name.trim();
    if (is_active !== undefined) updates.is_active = is_active;

    const { error } = await supabaseAdmin
      .from('email_aliases')
      .update(updates)
      .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update alias' }, { status: 500 });
  }
}

// DELETE: Delete alias (only if not assigned to any user)
export async function DELETE(request: NextRequest) {
  try {
    const caller = await verifySuperAdmin(request);
    if (!caller) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Alias ID required' }, { status: 400 });

    // Check if alias is assigned to any user
    const { data: users } = await supabaseAdmin
      .from('crm_users')
      .select('id')
      .eq('email_alias_id', id)
      .limit(1);

    if (users && users.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete alias that is assigned to a user. Unassign it first.' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('email_aliases')
      .delete()
      .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete alias' }, { status: 500 });
  }
}
