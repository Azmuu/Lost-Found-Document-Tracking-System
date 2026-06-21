import React, { useState } from 'react';
import { RefreshCw, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/authService';
import ThemeToggle from '../components/ThemeToggle';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { data } = await forgotPassword(email);
      setMessage(data.message);
      if (data.resetToken) setResetToken(data.resetToken);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
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
        <div className="auth-card animate-fade-up text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
            <RefreshCw className="w-7 h-7 text-emerald-300" />
          </div>

          <h2 className="text-3xl font-bold text-white">Forgot password?</h2>
          <p className="text-sm text-white/60 mt-2 mb-8">
            Enter your email and we&apos;ll send you a recovery link.
          </p>

          {message && (
            <div className="mb-5 text-sm text-emerald-100 bg-emerald-500/15 border border-emerald-400/30 p-4 rounded-xl backdrop-blur-sm">
              {message}
            </div>
          )}

          {resetToken && (
            <div className="mb-5 text-sm text-left bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <p className="font-semibold text-white/90 mb-1">Dev reset token:</p>
              <Link to={`/reset-password/${resetToken}`} className="text-emerald-300 break-all hover:underline">
                {resetToken}
              </Link>
            </div>
          )}

          <form className="space-y-5 text-left" onSubmit={handleSubmit}>
            <div>
              <label className="auth-label">Email address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="auth-input"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 !text-base !rounded-xl">
              {loading ? 'Sending...' : <>Send Recovery Link <ArrowRight className="w-5 h-5" /></>}
            </button>
          </form>

          <Link to="/login" className="inline-block mt-8 text-sm font-bold text-emerald-300 hover:text-emerald-200 hover:underline">
            ← Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
