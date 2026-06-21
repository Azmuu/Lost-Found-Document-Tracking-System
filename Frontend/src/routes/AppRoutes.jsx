import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';

import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Upload from '../pages/Upload';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';

import Overview from '../pages/dashboard/Overview';
import MyDocuments from '../pages/MyDocuments';
import Notifications from '../pages/Notifications';
import Profile from '../pages/Profile';

import AdminDashboard from '../pages/admin/Dashboard';
import AdminVerification from '../pages/admin/Verification';
import AdminDocuments from '../pages/admin/Documents';
import AdminUsers from '../pages/admin/Users';
import AdminActivityLogs from '../pages/admin/ActivityLogs';
import AdminClaims from '../pages/admin/Claims';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard/overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="my-documents" element={<MyDocuments />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="verification" element={<AdminVerification />} />
        <Route path="documents" element={<AdminDocuments />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="claims" element={<AdminClaims />} />
        <Route path="activity" element={<AdminActivityLogs />} />
      </Route>

      <Route path="*" element={<div className="p-8 text-center text-sm">404 — Page Not Found</div>} />
    </Routes>
  );
}
