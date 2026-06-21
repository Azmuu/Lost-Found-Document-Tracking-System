import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      navigate(data.user.role === 'admin' ? '/admin' : from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen auth-page-bg flex flex-col">
      <div className="relative z-10 flex justify-between items-center p-5">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Found<span className="text-emerald-300">Link</span></span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        <div className="auth-card animate-fade-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Sign in</h2>
            <p className="text-sm text-white/60 mt-2">Access your secure document recovery account</p>
          </div>

          {error && (
            <div className="mb-5 text-sm text-red-100 bg-red-500/15 border border-red-400/30 p-4 rounded-xl backdrop-blur-sm">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="auth-label">Email address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="auth-input"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-white/90">Password</label>
                <Link to="/forgot-password" className="text-sm font-semibold text-emerald-300 hover:text-emerald-200 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="auth-input"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 !text-base !rounded-xl mt-2">
              {loading ? 'Signing in...' : <>Sign In <ArrowRight className="w-5 h-5" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-white/60 mt-8">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-bold text-emerald-300 hover:text-emerald-200 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>

      <p className="relative z-10 text-center text-[11px] text-white/40 pb-5">
        © {new Date().getFullYear()} FoundLink. All rights reserved.
      </p>
    </div>
  );
}
