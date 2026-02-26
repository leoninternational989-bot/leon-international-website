'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { toast } from 'sonner';
import { Search, Eye, Trash2, Mail, ChevronLeft, ChevronRight, Send, Loader2 } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import StatusBadge from '@/components/admin/StatusBadge';
import Modal from '@/components/admin/Modal';
import { motion, AnimatePresence } from 'framer-motion';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const PAGE_SIZE = 10;
const STATUSES = ['all', 'new', 'in_progress', 'resolved', 'closed'];
const REPLY_TEMPLATES = [
  { label: 'Acknowledgment', text: 'Thank you for your inquiry. We are reviewing your request and will get back to you shortly with more details.' },
  { label: 'Need More Info', text: 'We need additional information to process your request. Could you please provide more details about your requirements?' },
  { label: 'Processed', text: 'Your inquiry has been processed by our technical team. We will share the relevant details with you soon.' },
  { label: 'Follow-up', text: 'This is a follow-up regarding your recent inquiry. Please let us know if you have any further questions or need additional assistance.' },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  // Modals
  const [viewItem, setViewItem] = useState<Contact | null>(null);
  const [deleteItem, setDeleteItem] = useState<Contact | null>(null);
  const [replyItem, setReplyItem] = useState<Contact | null>(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchContacts = useCallback(async () => {
    const supabase = createClient();
    let query = supabase
      .from('contacts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (statusFilter !== 'all') query = query.eq('status', statusFilter);
    if (search.trim()) query = query.or(`name.ilike.%${search.trim()}%,email.ilike.%${search.trim()}%,subject.ilike.%${search.trim()}%`);

    const { data, count } = await query;
    setContacts(data || []);
    setTotal(count || 0);
    setLoading(false);
  }, [page, statusFilter, search]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Real-time subscription
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel('contacts-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'contacts' }, (payload) => {
        const newContact = payload.new as Contact;
        if (page === 0 && (statusFilter === 'all' || statusFilter === 'new')) {
          setContacts((prev) => [newContact, ...prev].slice(0, PAGE_SIZE));
          setTotal((prev) => prev + 1);
          toast.info(`New inquiry from ${newContact.name}`);
        }
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'contacts' }, (payload) => {
        setContacts((prev) => prev.filter((c) => c.id !== payload.old.id));
        setTotal((prev) => Math.max(prev - 1, 0));
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'contacts' }, (payload) => {
        setContacts((prev) => prev.map((c) => (c.id === payload.new.id ? { ...c, ...payload.new } : c)));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [page, statusFilter]);

  async function handleStatusChange(id: string, status: string) {
    const res = await fetch('/api/admin/contacts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      toast.success('Status updated');
    } else {
      toast.error('Failed to update status');
    }
  }

  async function handleDelete() {
    if (!deleteItem) return;
    setDeleting(true);
    const res = await fetch('/api/admin/contacts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: deleteItem.id }),
    });
    setDeleting(false);
    setDeleteItem(null);
    if (res.ok) {
      toast.success('Contact deleted');
    } else {
      toast.error('Failed to delete');
    }
  }

  async function handleReply() {
    if (!replyItem || !replyMessage.trim()) return;
    setSending(true);
    const res = await fetch('/api/admin/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: replyItem.email,
        name: replyItem.name,
        subject: replySubject || `Re: ${replyItem.subject}`,
        message: replyMessage,
      }),
    });
    setSending(false);
    if (res.ok) {
      toast.success('Reply sent successfully');
      setReplyItem(null);
      setReplyMessage('');
      setReplySubject('');
    } else {
      toast.error('Failed to send reply');
    }
  }

  function openReply(contact: Contact) {
    setReplyItem(contact);
    setReplySubject(`Re: ${contact.subject}`);
    setReplyMessage('');
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="max-w-7xl space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1] transition-colors"
            placeholder="Search contacts..."
          />
        </div>
        <div className="flex gap-1.5 bg-white border border-gray-200 rounded-lg p-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(0); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                statusFilter === s ? 'bg-[#0E2F44] text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {s === 'all' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Subject</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-gray-400">
                      <div className="w-6 h-6 border-2 border-gray-200 border-t-[#E67E22] rounded-full animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : contacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-gray-400 text-sm">No contacts found</td>
                  </tr>
                ) : (
                  contacts.map((c) => (
                    <motion.tr
                      key={c.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-gray-800">{c.name}</p>
                        <p className="text-xs text-gray-400 md:hidden">{c.email}</p>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">{c.email}</td>
                      <td className="px-5 py-3.5 text-gray-600 hidden lg:table-cell">{c.subject}</td>
                      <td className="px-5 py-3.5">
                        <select
                          value={c.status}
                          onChange={(e) => handleStatusChange(c.id, e.target.value)}
                          className="appearance-none bg-transparent text-xs font-medium cursor-pointer focus:outline-none"
                        >
                          {['new', 'in_progress', 'resolved', 'closed'].map((s) => (
                            <option key={s} value={s}>{s === 'in_progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs hidden sm:table-cell">{formatDateTime(c.created_at)}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setViewItem(c)} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="View">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button onClick={() => openReply(c)} className="p-1.5 rounded-lg text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors" title="Reply">
                            <Mail className="h-4 w-4" />
                          </button>
                          <button onClick={() => setDeleteItem(c)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total}</span>
            <div className="flex gap-1">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Modal */}
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title="Contact Details">
        {viewItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Name', value: viewItem.name },
                { label: 'Email', value: viewItem.email },
                { label: 'Phone', value: viewItem.phone || '—' },
                { label: 'Company', value: viewItem.company || '—' },
                { label: 'Subject', value: viewItem.subject },
                { label: 'Date', value: formatDateTime(viewItem.created_at) },
              ].map((f) => (
                <div key={f.label}>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{f.label}</p>
                  <p className="text-sm text-gray-800">{f.value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Message</p>
              <p className="text-sm text-gray-800 bg-gray-50 rounded-lg p-3 leading-relaxed whitespace-pre-wrap">{viewItem.message}</p>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => { setViewItem(null); openReply(viewItem); }} className="flex-1 flex items-center justify-center gap-2 bg-[#0E2F44] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#1A5276] transition-colors">
                <Mail className="h-4 w-4" /> Reply
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal open={!!deleteItem} onClose={() => setDeleteItem(null)} title="Confirm Delete">
        {deleteItem && (
          <div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete the inquiry from <strong className="text-gray-800">{deleteItem.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteItem(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center gap-2">
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reply Modal */}
      <Modal open={!!replyItem} onClose={() => setReplyItem(null)} title={`Reply to ${replyItem?.name || ''}`} maxWidth="max-w-xl">
        {replyItem && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {REPLY_TEMPLATES.map((t) => (
                <button
                  key={t.label}
                  onClick={() => setReplyMessage(t.text)}
                  className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full hover:bg-[#0E2F44] hover:text-white transition-colors"
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
              <input
                value={replySubject}
                onChange={(e) => setReplySubject(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea
                rows={5}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1] resize-none"
                placeholder="Write your reply..."
              />
            </div>
            <div className="flex gap-3 justify-end pt-1">
              <button onClick={() => setReplyItem(null)} className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button onClick={handleReply} disabled={sending || !replyMessage.trim()} className="px-5 py-2.5 text-sm font-medium text-white bg-[#E67E22] rounded-lg hover:bg-[#CA6F1E] disabled:opacity-50 transition-colors flex items-center gap-2">
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send Reply
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
