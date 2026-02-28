import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase-server';
import { gmail } from '@/lib/gmail';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const STORAGE_BUCKET = 'email-attachments';

// Delete attachment files from storage + remove DB records for given message IDs
async function cleanupAttachments(messageIds: string[]) {
  if (messageIds.length === 0) return 0;

  const { data: attachments } = await supabaseAdmin
    .from('attachments')
    .select('id, storage_path, file_size')
    .in('message_id', messageIds);

  if (!attachments || attachments.length === 0) return 0;

  // Delete files from storage bucket in batch
  const storagePaths = attachments
    .map((a) => a.storage_path)
    .filter(Boolean);

  if (storagePaths.length > 0) {
    const { error: storageErr } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .remove(storagePaths);

    if (storageErr) {
      console.error('Storage cleanup error:', storageErr.message);
    }
  }

  // Delete attachment DB records
  const attachmentIds = attachments.map((a) => a.id);
  await supabaseAdmin
    .from('attachments')
    .delete()
    .in('id', attachmentIds);

  return attachments.reduce((sum, a) => sum + (a.file_size || 0), 0);
}

export async function POST(request: NextRequest) {
  try {
    // Verify authenticated user
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user role
    const { data: crmUser } = await supabaseAdmin
      .from('crm_users')
      .select('role')
      .eq('id', user.id)
      .single();

    const isSuperAdmin = crmUser?.role === 'super_admin';

    const { type, messageId, conversationId, deleteFromGmail } = await request.json();

    // Only super admin can delete from Gmail
    if (deleteFromGmail && !isSuperAdmin) {
      return NextResponse.json({ error: 'Only admin can delete from Gmail' }, { status: 403 });
    }

    if (type === 'message' && messageId) {
      // Get message info
      const { data: msg } = await supabaseAdmin
        .from('messages')
        .select('gmail_message_id')
        .eq('id', messageId)
        .single();

      // Clean up attachments from storage + DB
      const freedBytes = await cleanupAttachments([messageId]);

      // Soft delete the message
      await supabaseAdmin
        .from('messages')
        .update({ is_deleted: true })
        .eq('id', messageId);

      // Optionally delete from Gmail (super admin only)
      if (deleteFromGmail && msg?.gmail_message_id) {
        try {
          await gmail.users.messages.trash({
            userId: 'me',
            id: msg.gmail_message_id,
          });
        } catch (gmailErr: any) {
          console.error('Gmail delete error:', gmailErr.message);
        }
      }

      return NextResponse.json({ success: true, freed_bytes: freedBytes });
    }

    if (type === 'conversation' && conversationId) {
      // Only super admin can delete conversations
      if (!isSuperAdmin) {
        return NextResponse.json({ error: 'Only admin can delete conversations' }, { status: 403 });
      }

      // Get all message IDs in conversation
      const { data: messages } = await supabaseAdmin
        .from('messages')
        .select('id, gmail_message_id')
        .eq('conversation_id', conversationId);

      const allMessageIds = (messages || []).map((m) => m.id);

      // Optionally trash from Gmail
      if (deleteFromGmail && messages) {
        for (const msg of messages) {
          if (msg.gmail_message_id) {
            try {
              await gmail.users.messages.trash({
                userId: 'me',
                id: msg.gmail_message_id,
              });
            } catch {
              // Continue with other messages
            }
          }
        }
      }

      // Clean up all attachments from storage + DB
      const freedBytes = await cleanupAttachments(allMessageIds);

      // Hard-delete all messages (data is backed up in Gmail)
      await supabaseAdmin
        .from('messages')
        .delete()
        .eq('conversation_id', conversationId);

      // Hard-delete conversation
      await supabaseAdmin
        .from('conversations')
        .delete()
        .eq('id', conversationId);

      return NextResponse.json({ success: true, freed_bytes: freedBytes });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (err: any) {
    console.error('Delete error:', err);
    return NextResponse.json({ error: err.message || 'Failed to delete' }, { status: 500 });
  }
}
