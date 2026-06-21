import api from './api';

export const updateProfile = (formData) =>
  api.put('/users/profile', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getMyActivityLogs = (params) => api.get('/users/activity-logs', { params });
