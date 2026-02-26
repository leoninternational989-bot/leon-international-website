'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Mail, FileText, Clock, AlertTriangle, TrendingUp, ArrowUpRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

interface Stats {
  totalContacts: number;
  totalQuotations: number;
  newToday: number;
  pendingActions: number;
}

interface RecentItem {
  id: string;
  name: string;
  type: 'contact' | 'quotation';
  subject: string;
  status: string;
  created_at: string;
}

interface WeeklyData {
  week: string;
  contacts: number;
  quotations: number;
}

interface UrgencyItem {
  label: string;
  count: number;
  color: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalContacts: 0, totalQuotations: 0, newToday: 0, pendingActions: 0 });
  const [recent, setRecent] = useState<RecentItem[]>([]);
  const [weekly, setWeekly] = useState<WeeklyData[]>([]);
  const [urgency, setUrgency] = useState<UrgencyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const supabase = createClient();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [contactsRes, quotationsRes, contactsTodayRes, quotationsTodayRes, pendingContactsRes, pendingQuotationsRes, recentContactsRes, recentQuotationsRes, quotationsAllRes] = await Promise.all([
      supabase.from('contacts').select('id', { count: 'exact', head: true }),
      supabase.from('quotations').select('id', { count: 'exact', head: true }),
      supabase.from('contacts').select('id', { count: 'exact', head: true }).gte('created_at', todayStart.toISOString()),
      supabase.from('quotations').select('id', { count: 'exact', head: true }).gte('created_at', todayStart.toISOString()),
      supabase.from('contacts').select('id', { count: 'exact', head: true }).in('status', ['new', 'in_progress']),
      supabase.from('quotations').select('id', { count: 'exact', head: true }).in('status', ['new', 'in_progress']),
      supabase.from('contacts').select('id, name, subject, status, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('quotations').select('id, name, request_type, status, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('quotations').select('urgency'),
    ]);

    setStats({
      totalContacts: contactsRes.count || 0,
      totalQuotations: quotationsRes.count || 0,
      newToday: (contactsTodayRes.count || 0) + (quotationsTodayRes.count || 0),
      pendingActions: (pendingContactsRes.count || 0) + (pendingQuotationsRes.count || 0),
    });

    // Merge recent
    const merged: RecentItem[] = [
      ...(recentContactsRes.data || []).map((c) => ({ ...c, type: 'contact' as const, subject: c.subject })),
      ...(recentQuotationsRes.data || []).map((q) => ({ ...q, type: 'quotation' as const, subject: q.request_type === 'service' ? 'Marine Services' : q.request_type === 'parts' ? 'Spare Parts' : 'Both' })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 7);
    setRecent(merged);

    // Weekly data (last 4 weeks)
    const weeks: WeeklyData[] = [];
    for (let i = 3; i >= 0; i--) {
      const start = new Date();
      start.setDate(start.getDate() - (i + 1) * 7);
      const end = new Date();
      end.setDate(end.getDate() - i * 7);
      const label = `Week ${4 - i}`;

      const [wc, wq] = await Promise.all([
        supabase.from('contacts').select('id', { count: 'exact', head: true }).gte('created_at', start.toISOString()).lt('created_at', end.toISOString()),
        supabase.from('quotations').select('id', { count: 'exact', head: true }).gte('created_at', start.toISOString()).lt('created_at', end.toISOString()),
      ]);
      weeks.push({ week: label, contacts: wc.count || 0, quotations: wq.count || 0 });
    }
    setWeekly(weeks);

    // Urgency breakdown
    const urgencyData = quotationsAllRes.data || [];
    const urgencyMap: Record<string, number> = {};
    urgencyData.forEach((q) => { urgencyMap[q.urgency] = (urgencyMap[q.urgency] || 0) + 1; });
    const colors: Record<string, string> = {
      'Standard (1-2 weeks)': '#2E86C1',
      'Urgent (3-5 days)': '#E67E22',
      'Emergency (24-48 hours)': '#E74C3C',
    };
    setUrgency(
      Object.entries(urgencyMap).map(([label, count]) => ({ label, count, color: colors[label] || '#5D6D7E' }))
    );

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-gray-200 border-t-[#E67E22] rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Contacts', value: stats.totalContacts, icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Quotations', value: stats.totalQuotations, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'New Today', value: stats.newToday, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Actions', value: stats.pendingActions, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const totalUrgency = urgency.reduce((s, u) => s + u.count, 0);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">{card.label}</span>
              <div className={`w-9 h-9 ${card.bg} rounded-lg flex items-center justify-center`}>
                <card.icon className={`h-[18px] w-[18px] ${card.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Weekly Submissions</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekly} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}
                />
                <Bar dataKey="contacts" name="Contacts" fill="#2E86C1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="quotations" name="Quotations" fill="#E67E22" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Urgency Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Quotation Urgency</h3>
          {urgency.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No quotations yet</p>
          ) : (
            <div className="space-y-4">
              {urgency.map((u) => {
                const pct = totalUrgency > 0 ? Math.round((u.count / totalUrgency) * 100) : 0;
                return (
                  <div key={u.label}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-gray-600 font-medium">{u.label}</span>
                      <span className="text-gray-800 font-semibold">{u.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: u.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Recent Submissions</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {recent.length === 0 ? (
            <div className="px-5 py-8 text-center text-gray-400 text-sm">No submissions yet</div>
          ) : (
            recent.map((item) => (
              <div key={`${item.type}-${item.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.type === 'contact' ? 'bg-blue-50' : 'bg-purple-50'}`}>
                    {item.type === 'contact' ? (
                      <Mail className="h-4 w-4 text-blue-600" />
                    ) : (
                      <FileText className="h-4 w-4 text-purple-600" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 truncate">{item.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-gray-400 hidden sm:block">{formatDate(item.created_at)}</span>
                  <Link
                    href={item.type === 'contact' ? '/admin/contacts' : '/admin/quotations'}
                    className="text-gray-400 hover:text-[#E67E22] transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
