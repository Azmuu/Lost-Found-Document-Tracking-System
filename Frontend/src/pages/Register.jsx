import React, { useState } from 'react';
import { ArrowRight, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms of Service.');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
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
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-xs font-semibold text-white/70 hover:text-emerald-300 hidden sm:block">
            Sign in
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        <div className="auth-card animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Create account</h2>
            <p className="text-sm text-white/60 mt-2">Fill in your details to get started</p>
          </div>

          {error && (
            <div className="mb-5 text-sm text-red-100 bg-red-500/15 border border-red-400/30 p-4 rounded-xl backdrop-blur-sm">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="auth-label">Full name</label>
              <div className="relative">
                <User className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="auth-input"
                />
              </div>
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="auth-label">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="auth-input"
                  />
                </div>
              </div>
              <div>
                <label className="auth-label">Confirm password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="auth-input"
                  />
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/15 cursor-pointer backdrop-blur-sm">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 rounded border-white/30 text-brand-600 focus:ring-emerald-400"
              />
              <span className="text-sm text-white/65 leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-emerald-300 font-semibold hover:underline">Terms</a>
                {' '}and{' '}
                <a href="#" className="text-emerald-300 font-semibold hover:underline">Privacy Policy</a>
              </span>
            </label>

            <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 !text-base !rounded-xl">
              {loading ? 'Creating account...' : <>Register <ArrowRight className="w-5 h-5" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-white/60 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-emerald-300 hover:text-emerald-200 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <p className="relative z-10 text-center text-[11px] text-white/40 pb-5">
        © {new Date().getFullYear()} FoundLink. Secure Document Recovery.
      </p>
    </div>
  );
}
