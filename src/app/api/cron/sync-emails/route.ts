import { NextRequest, NextResponse } from 'next/server';
import { syncEmails } from '@/lib/email-sync';

// POST: Cron email sync handler (called by Supabase pg_cron + pg_net)
export async function POST(request: NextRequest) {
  try {
    // Verify authorization (Bearer token from pg_cron vault secret)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await syncEmails();
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Cron email sync error:', err);
    return NextResponse.json(
      { error: err.message || 'Sync failed' },
      { status: 500 }
    );
  }
}
