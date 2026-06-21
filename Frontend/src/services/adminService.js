import api from './api';

export const getDashboardStats = () => api.get('/admin/dashboard');
export const getVerificationQueue = (params) => api.get('/admin/verification-queue', { params });
export const verifyDocument = (id) => api.put(`/admin/documents/${id}/verify`);
export const rejectDocument = (id, reason) => api.put(`/admin/documents/${id}/reject`, { reason });
export const getAllDocuments = (params) => api.get('/admin/documents', { params });
export const getAllUsers = (params) => api.get('/admin/users', { params });
export const updateUser = (id, data) => api.put(`/admin/users/${id}`, data);
export const getAllClaims = (params) => api.get('/admin/claims', { params });
export const updateClaimStatus = (id, data) => api.put(`/admin/claims/${id}`, data);
export const getActivityLogs = (params) => api.get('/admin/activity-logs', { params });
export const getVerifications = (params) => api.get('/admin/verifications', { params });
export const updatePrivacySettings = (data) => api.put('/admin/privacy', data);
