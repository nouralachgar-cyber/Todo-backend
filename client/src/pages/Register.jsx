import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Loader2, CheckSquare, Layers } from 'lucide-react';
import api from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please provide a valid email address');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      if (data.success) {
        navigate('/login');
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
      <nav className="bg-canvas sticky top-0 z-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary w-9 h-9 rounded-md flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-on-primary" />
            </div>
            <span className="text-[18px] leading-[1.4] text-ink" style={{ fontWeight: 600 }}>Todo App</span>
          </div>
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center px-[20px] py-[12px] bg-primary text-on-primary rounded-md text-[14px] leading-none hover:bg-surface-dark transition-colors"
            style={{ fontWeight: 600, height: '44px' }}
          >
            Sign in
          </Link>
        </div>
      </nav>

      <div className="flex-1 max-w-[1280px] mx-auto w-full px-6 lg:px-8 py-12 lg:py-[96px] grid lg:grid-cols-12 gap-8 items-start">
        {/* Left editorial — Plain Black 500 */}
        <div className="lg:col-span-7 lg:sticky lg:top-[96px]">
          <p className="text-[12px] tracking-[1.5px] uppercase text-muted mb-4" style={{ fontWeight: 600 }}>
            Create account — Join us
          </p>
          <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.0] tracking-[-2.5px] text-ink" style={{ fontWeight: 500 }}>
            Start
            <br />
            organizing.
          </h1>
          <p className="text-[16px] leading-[1.55] text-body mt-4 max-w-md" style={{ fontWeight: 400 }}>
            Join and shape your workflow. One saturated card at a time — pink, teal, lavender cycle.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-brand-lavender rounded-xl p-6">
              <p className="text-[12px] tracking-[1.5px] uppercase text-ink/60 mb-2" style={{ fontWeight: 600 }}>Lavender — AI agent</p>
              <p className="text-[16px] leading-[1.4] text-ink" style={{ fontWeight: 600 }}>Warm & playful</p>
            </div>
            <div className="bg-brand-peach rounded-xl p-6">
              <p className="text-[12px] tracking-[1.5px] uppercase text-ink/60 mb-2" style={{ fontWeight: 600 }}>Peach — SaaS warmth</p>
              <p className="text-[16px] leading-[1.4] text-ink" style={{ fontWeight: 600 }}>Hand-crafted 3D</p>
            </div>
          </div>
        </div>

        {/* Right — form as pricing-tier-card + feature-card-ochre accent */}
        <div className="lg:col-span-5">
          <div className="bg-brand-ochre rounded-xl p-[1px]">
            <div className="bg-canvas rounded-xl p-8">
              <p className="text-[12px] tracking-[1.5px] uppercase text-muted-soft mb-2" style={{ fontWeight: 600 }}>Your details — Ochre card</p>
              <h2 className="text-[24px] leading-[1.3] tracking-[-0.3px] text-ink mb-6" style={{ fontWeight: 600 }}>
                Create account
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-md text-[14px] leading-[1.55]" style={{ fontWeight: 400 }}>
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[14px] leading-[1.55] text-ink mb-2" style={{ fontWeight: 600 }}>Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-soft" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-[16px] py-[12px] bg-canvas border border-hairline rounded-md text-[16px] leading-[1.55] placeholder:text-muted-soft text-ink focus:outline-none focus:border-ink transition-colors"
                      style={{ fontWeight: 400, height: '44px' }}
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] leading-[1.55] text-ink mb-2" style={{ fontWeight: 600 }}>Email</label>
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
                  <label className="block text-[14px] leading-[1.55] text-ink mb-2" style={{ fontWeight: 600 }}>Password</label>
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
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] leading-[1.55] text-ink mb-2" style={{ fontWeight: 600 }}>Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-soft" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-[16px] py-[12px] bg-canvas border border-hairline rounded-md text-[16px] leading-[1.55] placeholder:text-muted-soft text-ink focus:outline-none focus:border-ink transition-colors"
                      style={{ fontWeight: 400, height: '44px' }}
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-[12px] px-[20px] bg-primary text-on-primary rounded-md text-[14px] leading-none disabled:bg-primary/30 hover:bg-surface-dark transition-colors"
                  style={{ fontWeight: 600, height: '44px' }}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </form>

              <p className="text-center text-[14px] leading-[1.55] text-body mt-6" style={{ fontWeight: 400 }}>
                Already have an account?{' '}
                <Link to="/login" className="text-ink underline underline-offset-4 decoration-hairline hover:decoration-ink" style={{ fontWeight: 600 }}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Small testimonial-card */}
          <div className="mt-6 bg-surface-card rounded-lg p-6 border border-hairline flex gap-4">
            <Layers className="w-6 h-6 text-brand-teal flex-shrink-0" />
            <p className="text-[14px] leading-[1.55] text-body" style={{ fontWeight: 400 }}>
              <span className="text-ink" style={{ fontWeight: 600 }}>Cream card</span> — testimonial & secondary cards use #f5f0e0.
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-surface-soft mt-auto">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-[14px] leading-[1.55] text-muted" style={{ fontWeight: 400 }}>© 2026 Todo App — Clay system · 6-color palette</p>
          <p className="text-[12px] tracking-[1.5px] uppercase text-muted-soft" style={{ fontWeight: 600 }}>Canvas #fffaf0 · Primary #0a0a0a</p>
        </div>
      </footer>
    </div>
  );
};

export default Register;
