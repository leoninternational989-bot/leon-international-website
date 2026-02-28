import { NextRequest, NextResponse } from 'next/server';
import { syncEmails } from '@/lib/email-sync';

// POST: Google Pub/Sub push notification handler
// This endpoint is NOT behind /admin middleware — it uses token-based auth
export async function POST(request: NextRequest) {
  try {
    // Verify token from query param
    const token = request.nextUrl.searchParams.get('token');
    const expectedToken = process.env.GMAIL_PUBSUB_VERIFICATION_TOKEN;

    if (!expectedToken || token !== expectedToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    // Decode Pub/Sub message
    const body = await request.json();
    const messageData = body?.message?.data;

    if (messageData) {
      const decoded = JSON.parse(
        Buffer.from(messageData, 'base64').toString('utf-8')
      );
      // decoded contains { emailAddress, historyId }
      console.log('Gmail push notification:', decoded.emailAddress, 'historyId:', decoded.historyId);
    }

    // Trigger email sync (fire and forget — Pub/Sub requires fast 200 response)
    syncEmails().catch((err) => {
      console.error('Gmail push sync error:', err);
    });

    // Return 200 immediately (required by Pub/Sub)
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Gmail webhook error:', err);
    // Still return 200 to prevent Pub/Sub from retrying endlessly
    return NextResponse.json({ ok: true });
  }
}
