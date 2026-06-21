const maskIdNumber = (idNumber) => {
  if (!idNumber || typeof idNumber !== 'string') return '****';
  const cleaned = idNumber.replace(/\s/g, '');
  if (cleaned.length <= 4) return `****${cleaned}`;
  return `****${cleaned.slice(-4)}`;
};

const extractLast4 = (idNumber) => {
  if (!idNumber || typeof idNumber !== 'string') return '';
  const cleaned = idNumber.replace(/\s/g, '');
  return cleaned.slice(-4);
};

const buildKeywords = (...parts) =>
  parts
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .split(/\s+/)
    .filter((word, index, arr) => word.length > 2 && arr.indexOf(word) === index);

module.exports = { maskIdNumber, extractLast4, buildKeywords };
