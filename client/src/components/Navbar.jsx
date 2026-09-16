import { LogOut, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-canvas sticky top-0 z-10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-[64px] flex items-center justify-between">
        {/* Left: logo + wordmark + nav links placeholder */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary w-9 h-9 rounded-md flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-on-primary" />
            </div>
            <span className="text-[18px] leading-[1.4] tracking-[0] text-ink" style={{ fontWeight: 600 }}>
              Todo App
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <span className="text-[14px] leading-[1.4] text-ink" style={{ fontWeight: 500 }}>Product</span>
            <span className="text-[14px] leading-[1.4] text-muted" style={{ fontWeight: 500 }}>Solutions</span>
            <span className="text-[14px] leading-[1.4] text-muted" style={{ fontWeight: 500 }}>Resources</span>
          </div>
        </div>

        {/* Right cluster: Sign in + primary CTA */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden md:inline text-[14px] leading-[1.55] text-body" style={{ fontWeight: 400 }}>
                <span className="text-muted">Hello,</span> <span className="text-ink" style={{ fontWeight: 600 }}>{user.name}</span>
              </span>
              <span className="hidden lg:inline-flex items-center px-3 py-1 bg-surface-card rounded-pill text-[13px] leading-[1.4] text-body" style={{ fontWeight: 500 }}>
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-[20px] py-[12px] bg-primary text-on-primary rounded-md text-[14px] leading-none hover:bg-surface-dark transition-colors"
                style={{ fontWeight: 600, height: '44px' }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <span className="hidden sm:inline text-[14px] leading-[1.4] text-ink" style={{ fontWeight: 500 }}>Sign in</span>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center px-[20px] py-[12px] bg-primary text-on-primary rounded-md text-[14px] leading-none hover:bg-surface-dark transition-colors"
                style={{ fontWeight: 600, height: '44px' }}
              >
                Try free
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
