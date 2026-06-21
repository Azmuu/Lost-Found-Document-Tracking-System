import React, { useEffect, useState } from 'react';
import { User, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, getMyActivityLogs } from '../services/userService';
import { changePassword } from '../services/authService';
import { formatDateTime } from '../utils/format';

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '', twoFactorEnabled: false });
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState('');
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        twoFactorEnabled: user.twoFactorEnabled || false,
      });
    }
    getMyActivityLogs({ limit: 10 }).then(({ data }) => setLogs(data.data || [])).catch(() => {});
  }, [user]);

  const handleSave = async () => {
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('phone', form.phone);
    fd.append('location', form.location);
    fd.append('twoFactorEnabled', form.twoFactorEnabled);
    try {
      await updateProfile(fd);
      setMessage('Profile updated successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed.');
    }
  };

  const handlePasswordChange = async () => {
    try {
      await changePassword(passwords);
      setMessage('Password changed successfully.');
      setPasswords({ currentPassword: '', newPassword: '' });
      setShowPasswordForm(false);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Password change failed.');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage your identity and security settings.</p>
        </div>
        <button onClick={handleSave} className="px-4 py-1.5 bg-[#005f54] text-white text-xs font-semibold rounded-lg hover:bg-[#004d44]">Save Changes</button>
      </div>

      {message && <div className="text-xs p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300">{message}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
          <h2 className="text-sm font-bold border-b border-slate-100 dark:border-slate-700 pb-3">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Full Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-xs" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email</label>
              <input value={form.email} disabled className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-xs opacity-60" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-xs" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-xs" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
            <h2 className="text-sm font-bold border-b border-slate-100 dark:border-slate-700 pb-2">Security</h2>
            <label className="flex justify-between items-center text-xs">
              <span className="font-bold">Two-Factor Auth</span>
              <input type="checkbox" checked={form.twoFactorEnabled} onChange={(e) => setForm({ ...form, twoFactorEnabled: e.target.checked })} />
            </label>
            <button onClick={() => setShowPasswordForm(!showPasswordForm)} className="w-full py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-semibold">Change Password</button>
            {showPasswordForm && (
              <div className="space-y-2">
                <input type="password" placeholder="Current password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-xs dark:bg-slate-700 dark:border-slate-600" />
                <input type="password" placeholder="New password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-xs dark:bg-slate-700 dark:border-slate-600" />
                <button onClick={handlePasswordChange} className="w-full py-2 bg-[#005f54] text-white rounded-lg text-xs">Update Password</button>
              </div>
            )}
          </div>
          {user?.isVerified && (
            <div className="bg-[#0b1b2d] text-white p-5 rounded-xl">
              <h3 className="text-xs font-bold uppercase text-teal-400">Verified Entity</h3>
              <p className="text-[11px] text-slate-400 mt-1">Your account is verified with full recovery access.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-sm font-bold mb-4 flex items-center gap-2"><Download className="w-4 h-4" /> Activity History</h2>
        <table className="w-full text-left text-xs">
          <thead className="text-slate-400 font-bold uppercase border-b border-slate-100 dark:border-slate-700">
            <tr><th className="p-3">Action</th><th className="p-3">IP</th><th className="p-3">Timestamp</th><th className="p-3 text-right">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {logs.map((log) => (
              <tr key={log._id}>
                <td className="p-3 font-semibold">{log.action.replace(/_/g, ' ')}</td>
                <td className="p-3 font-mono text-[11px]">{log.ipAddress || '—'}</td>
                <td className="p-3">{formatDateTime(log.createdAt)}</td>
                <td className="p-3 text-right"><span className="bg-emerald-50 text-emerald-600 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">{log.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
