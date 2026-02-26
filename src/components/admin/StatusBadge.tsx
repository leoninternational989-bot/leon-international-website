import { statusColors, statusLabel } from '@/lib/utils';

export default function StatusBadge({ status }: { status: string }) {
  const c = statusColors[status] || statusColors.new;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {statusLabel(status)}
    </span>
  );
}
