export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const statusLabel = (status) =>
  (status || '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const statusColor = (status) => {
  const map = {
    pending: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    in_review: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    verified: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    rejected: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    claimed: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    returned: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
    approved: 'bg-emerald-50 text-emerald-600',
    ready_for_collection: 'bg-[#005f54] text-white',
    under_review: 'bg-blue-50 text-blue-600',
    completed: 'bg-emerald-50 text-emerald-600',
    cancelled: 'bg-slate-100 text-slate-500',
  };
  return map[status] || 'bg-slate-100 text-slate-600';
};
