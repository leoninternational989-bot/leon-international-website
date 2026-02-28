import { NextRequest, NextResponse } from 'next/server';
import { registerGmailWatch } from '@/lib/gmail-watch';

// POST: Renew Gmail watch (called by cron or manually)
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await registerGmailWatch();
    return NextResponse.json({
      success: true,
      historyId: result.historyId,
      expiration: result.expiration,
    });
  } catch (err: any) {
    console.error('Renew Gmail watch error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to renew watch' },
      { status: 500 }
    );
  }
}
