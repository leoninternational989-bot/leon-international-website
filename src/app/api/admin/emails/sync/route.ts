import { NextResponse } from 'next/server';
import { createClient as createServerClient } from '@/lib/supabase-server';
import { syncEmails } from '@/lib/email-sync';

// POST: Manual email sync trigger (authenticated users only)
export async function POST() {
  try {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await syncEmails();
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Email sync error:', err);
    return NextResponse.json(
      { error: err.message || 'Sync failed' },
      { status: 500 }
    );
  }
}

// GET: Get last sync status
export async function GET() {
  try {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data } = await supabase
      .from('email_sync_log')
      .select('*')
      .order('synced_at', { ascending: false })
      .limit(1)
      .single();

    return NextResponse.json(data || { status: 'never', synced_at: null });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to get sync status' },
      { status: 500 }
    );
  }
}
