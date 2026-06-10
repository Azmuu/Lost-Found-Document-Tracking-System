import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts - Waxaan dib ugu laabanaynaa galka 'src' ka dibna 'layouts'
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';

// Pages - Waxaan dib ugu laabanaynaa galka 'src' ka dibna 'pages'
import Home from '../pages/Home'; 
import Search from '../pages/Search';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Dashboard Pages
import Overview from '../pages/dashboard/Overview';
import MyDocuments from '../pages/dashboard/MyDocuments'; 
import Notifications from '../pages/dashboard/Notifications';
import Profile from '../pages/dashboard/Profile';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';

export default function AppRoutes() {
  return (
    <Routes>
      {/* A. BOGAGGA DADWEYNAHA */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Route>

      {/* B. BOGAGGA KOONTOOYINKA */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* C. BOGAGGA ISTICMAALAHA (Dashboard) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard/overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="my-documents" element={<MyDocuments />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* D. BOGGA MAAMULKA (Admin Panel) */}
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
    </Routes>
  );
}