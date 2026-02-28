import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase-server';
import { gmail } from '@/lib/gmail';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
      // Soft delete a single message
      const { data: msg } = await supabaseAdmin
        .from('messages')
        .select('gmail_message_id')
        .eq('id', messageId)
        .single();

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
          // Don't fail the request — soft delete already succeeded
        }
      }

      return NextResponse.json({ success: true });
    }

    if (type === 'conversation' && conversationId) {
      // Only super admin can delete conversations
      if (!isSuperAdmin) {
        return NextResponse.json({ error: 'Only admin can delete conversations' }, { status: 403 });
      }

      // Get all messages for Gmail deletion
      if (deleteFromGmail) {
        const { data: messages } = await supabaseAdmin
          .from('messages')
          .select('gmail_message_id')
          .eq('conversation_id', conversationId)
          .eq('is_deleted', false);

        if (messages) {
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
      }

      // Soft delete all messages in conversation
      await supabaseAdmin
        .from('messages')
        .update({ is_deleted: true })
        .eq('conversation_id', conversationId);

      // Soft delete conversation
      await supabaseAdmin
        .from('conversations')
        .update({ is_deleted: true })
        .eq('id', conversationId);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (err: any) {
    console.error('Delete error:', err);
    return NextResponse.json({ error: err.message || 'Failed to delete' }, { status: 500 });
  }
}
