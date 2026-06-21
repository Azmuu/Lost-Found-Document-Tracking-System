import api from './api';

export const searchDocuments = (params) => api.get('/documents/search', { params });
export const getDocumentTypes = () => api.get('/documents/types');
export const getMyDocuments = (params) => api.get('/documents/my', { params });
export const getDocument = (id) => api.get(`/documents/${id}`);
export const uploadDocument = (formData) =>
  api.post('/documents', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateDocument = (id, formData) =>
  api.put(`/documents/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteDocument = (id) => api.delete(`/documents/${id}`);
