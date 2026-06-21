export const resolveImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const base = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
  return `${base}${url}`;
};
