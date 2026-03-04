import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getAuthenticatedUserId } from '@/lib/auth-helper';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Verify caller is super_admin
    const callerId = await getAuthenticatedUserId(request);
    if (!callerId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: crmUser } = await supabaseAdmin
      .from('crm_users')
      .select('role')
      .eq('id', callerId)
      .single();

    if (crmUser?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Prevent self-deletion
    if (id === callerId) {
      return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
    }

    // Delete from crm_users first
    const { error: crmError } = await supabaseAdmin
      .from('crm_users')
      .delete()
      .eq('id', id);

    if (crmError) {
      return NextResponse.json({ error: crmError.message }, { status: 500 });
    }

    // Delete from Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
