import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Loader2, CheckSquare, Mountain, Sparkles } from 'lucide-react';
import api from '../services/api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Server error. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {/* Top nav */}
      <nav className="bg-canvas sticky top-0 z-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary w-9 h-9 rounded-md flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-on-primary" />
            </div>
            <span className="text-[18px] leading-[1.4] text-ink" style={{ fontWeight: 600 }}>Todo App</span>
          </div>
          <Link
            to="/register"
            className="hidden sm:inline-flex items-center px-[20px] py-[12px] bg-canvas border border-hairline text-ink rounded-md text-[14px] leading-none hover:border-ink transition-colors"
            style={{ fontWeight: 600, height: '44px' }}
          >
            Create account
          </Link>
        </div>
      </nav>

      {/* Hero-band */}
      <div className="flex-1 max-w-[1280px] mx-auto w-full px-6 lg:px-8 py-12 lg:py-[96px] grid lg:grid-cols-12 gap-8 items-center">
        {/* Left 7/5 */}
        <div className="lg:col-span-7">
          <p className="text-[12px] tracking-[1.5px] uppercase text-muted mb-4" style={{ fontWeight: 600 }}>
            Sign in — Welcome back
          </p>
          <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.0] tracking-[-2.5px] text-ink" style={{ fontWeight: 500 }}>
            Welcome
            <br />
            back.
          </h1>
          <p className="text-[16px] leading-[1.55] text-body mt-4 max-w-md" style={{ fontWeight: 400 }}>
            Sign in to continue. Your tasks, your system — cream canvas, saturated cards, claymation warmth.
          </p>
          <div className="mt-6 hidden lg:flex items-center gap-3">
            <div className="flex -space-x-2">
              <span className="w-8 h-8 bg-brand-pink rounded-full border-2 border-canvas" />
              <span className="w-8 h-8 bg-brand-teal rounded-full border-2 border-canvas" />
              <span className="w-8 h-8 bg-brand-lavender rounded-full border-2 border-canvas" />
            </div>
            <span className="text-[14px] text-muted" style={{ fontWeight: 400 }}>Trusted by teams going to market</span>
          </div>
        </div>

        {/* Right illustration + form feature-card */}
        <div className="lg:col-span-5 space-y-6">
          {/* hero-illustration-card */}
          <div className="bg-surface-soft rounded-xl p-6 flex items-center gap-4 border border-hairline/50">
            <div className="w-14 h-14 bg-brand-peach rounded-lg flex items-center justify-center flex-shrink-0">
              <Mountain className="w-7 h-7 text-ink" />
            </div>
            <div>
              <p className="text-[12px] tracking-[1.5px] uppercase text-muted-soft" style={{ fontWeight: 600 }}>Clay hero artifact</p>
              <p className="text-[14px] leading-[1.55] text-body" style={{ fontWeight: 400 }}>3D clay mountains — brand voltage</p>
            </div>
          </div>

          {/* Form as pricing-tier-card + lavender accent header */}
          <div className="bg-canvas border border-hairline rounded-lg p-8">
            <p className="text-[12px] tracking-[1.5px] uppercase text-muted-soft mb-2" style={{ fontWeight: 600 }}>Your account</p>
            <h2 className="text-[24px] leading-[1.3] tracking-[-0.3px] text-ink mb-6" style={{ fontWeight: 600 }}>
              Sign in
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-md text-[14px] leading-[1.55]" style={{ fontWeight: 400 }}>
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[14px] leading-[1.55] text-ink mb-2" style={{ fontWeight: 600 }}>
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-soft" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-[16px] py-[12px] bg-canvas border border-hairline rounded-md text-[16px] leading-[1.55] placeholder:text-muted-soft text-ink focus:outline-none focus:border-ink transition-colors"
                    style={{ fontWeight: 400, height: '44px' }}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] leading-[1.55] text-ink mb-2" style={{ fontWeight: 600 }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-soft" />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-[16px] py-[12px] bg-canvas border border-hairline rounded-md text-[16px] leading-[1.55] placeholder:text-muted-soft text-ink focus:outline-none focus:border-ink transition-colors"
                    style={{ fontWeight: 400, height: '44px' }}
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-[12px] px-[20px] bg-primary text-on-primary rounded-md text-[14px] leading-none disabled:bg-primary/30 hover:bg-surface-dark transition-colors"
                style={{ fontWeight: 600, height: '44px' }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </form>

            <p className="text-center text-[14px] leading-[1.55] text-body mt-6" style={{ fontWeight: 400 }}>
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-ink underline underline-offset-4 decoration-hairline hover:decoration-ink" style={{ fontWeight: 600 }}>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* CTA band */}
      <div className="max-w-[1280px] mx-auto w-full px-6 lg:px-8 pb-12">
        <div className="bg-surface-soft rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-brand-ochre" />
            <p className="text-[14px] leading-[1.55] text-body" style={{ fontWeight: 400 }}>
              <span className="text-ink" style={{ fontWeight: 600 }}>Cream footer ahead</span> — Clay closes warm, not dark.
            </p>
          </div>
          <span className="text-[12px] tracking-[1.5px] uppercase text-muted-soft" style={{ fontWeight: 600 }}>Surface Soft #faf5e8</span>
        </div>
      </div>

      <footer className="bg-surface-soft mt-auto">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-[14px] leading-[1.55] text-muted" style={{ fontWeight: 400 }}>© 2026 Todo App — Clay system · Rounded display 500 · 96px rhythm</p>
          <p className="text-[12px] tracking-[1.5px] uppercase text-muted-soft" style={{ fontWeight: 600 }}>Inter · Plain Black substitute</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
