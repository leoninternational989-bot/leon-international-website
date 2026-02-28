import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const STORAGE_BUCKET = 'email-attachments';
const RETENTION_DAYS = 20;

// Delete attachment files from storage + DB records for given message IDs
async function cleanupAttachments(messageIds: string[]): Promise<number> {
  if (messageIds.length === 0) return 0;

  const { data: attachments } = await supabaseAdmin
    .from('attachments')
    .select('id, storage_path, file_size')
    .in('message_id', messageIds);

  if (!attachments || attachments.length === 0) return 0;

  const storagePaths = attachments
    .map((a) => a.storage_path)
    .filter(Boolean);

  if (storagePaths.length > 0) {
    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .remove(storagePaths);

    if (error) console.error('Storage cleanup error:', error.message);
  }

  await supabaseAdmin
    .from('attachments')
    .delete()
    .in('id', attachments.map((a) => a.id));

  return attachments.reduce((sum, a) => sum + (a.file_size || 0), 0);
}

export async function POST(request: NextRequest) {
  try {
    // Verify cron authorization
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);
    const cutoff = cutoffDate.toISOString();

    let purgedMessages = 0;
    let purgedConversations = 0;
    let freedBytes = 0;

    // 1. Find soft-deleted messages older than retention period
    const { data: deletedMessages } = await supabaseAdmin
      .from('messages')
      .select('id')
      .eq('is_deleted', true)
      .lt('created_at', cutoff);

    if (deletedMessages && deletedMessages.length > 0) {
      const msgIds = deletedMessages.map((m) => m.id);
      freedBytes += await cleanupAttachments(msgIds);

      await supabaseAdmin
        .from('messages')
        .delete()
        .in('id', msgIds);

      purgedMessages = deletedMessages.length;
    }

    // 2. Find soft-deleted conversations older than retention period
    const { data: deletedConversations } = await supabaseAdmin
      .from('conversations')
      .select('id')
      .eq('is_deleted', true)
      .lt('created_at', cutoff);

    if (deletedConversations && deletedConversations.length > 0) {
      for (const conv of deletedConversations) {
        // Get remaining messages in this conversation
        const { data: convMessages } = await supabaseAdmin
          .from('messages')
          .select('id')
          .eq('conversation_id', conv.id);

        if (convMessages && convMessages.length > 0) {
          const msgIds = convMessages.map((m) => m.id);
          freedBytes += await cleanupAttachments(msgIds);

          await supabaseAdmin
            .from('messages')
            .delete()
            .in('id', msgIds);
        }

        // Hard-delete the conversation
        await supabaseAdmin
          .from('conversations')
          .delete()
          .eq('id', conv.id);
      }

      purgedConversations = deletedConversations.length;
    }

    const result = {
      success: true,
      purged_messages: purgedMessages,
      purged_conversations: purgedConversations,
      freed_bytes: freedBytes,
      freed_mb: Math.round((freedBytes / 1024 / 1024) * 100) / 100,
      cutoff_date: cutoff,
    };

    console.log('Cleanup completed:', result);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Cleanup cron error:', err);
    return NextResponse.json(
      { error: err.message || 'Cleanup failed' },
      { status: 500 }
    );
  }
}
