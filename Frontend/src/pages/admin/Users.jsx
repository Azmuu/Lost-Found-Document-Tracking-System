import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUser } from '../../services/adminService';
import { formatDate } from '../../utils/format';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const load = () => {
    getAllUsers({ search: search || undefined })
      .then(({ data }) => setUsers(data.data))
      .catch(() => setUsers([]));
  };

  useEffect(() => { load(); }, []);

  const toggleActive = async (user) => {
    await updateUser(user._id, { isActive: !user.isActive });
    load();
  };

  const toggleRole = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Change ${user.email} to ${newRole}?`)) return;
    await updateUser(user._id, { role: newRole });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <p className="text-xs text-slate-400">View and manage registered users.</p>
        </div>
        <div className="flex gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter users..." className="px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-xs" />
          <button onClick={load} className="px-4 py-2 bg-[#005f54] text-white rounded-lg text-xs font-bold">Search</button>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-700/50 font-bold uppercase text-slate-400 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="p-4 font-semibold">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${user.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>{user.role}</span></td>
                <td className="p-4"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${user.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{user.isActive ? 'Active' : 'Inactive'}</span></td>
                <td className="p-4 text-slate-400">{formatDate(user.createdAt)}</td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => toggleActive(user)} className="text-[10px] font-bold text-slate-500 hover:underline">{user.isActive ? 'Deactivate' : 'Activate'}</button>
                  <button onClick={() => toggleRole(user)} className="text-[10px] font-bold text-[#005f54] hover:underline">Toggle Role</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
