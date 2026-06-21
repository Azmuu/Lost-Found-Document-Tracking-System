import api from './api';

export const createClaim = (documentId, claimMessage) =>
  api.post(`/claims/document/${documentId}`, { claimMessage });
export const getMyClaims = (params) => api.get('/claims/my', { params });
export const getClaim = (id) => api.get(`/claims/${id}`);
export const cancelClaim = (id) => api.put(`/claims/${id}/cancel`);
