import { useEffect, useState, useMemo } from 'react';
import { Search, Loader2, Sparkles, Layers, Mountain } from 'lucide-react';
import Navbar from '../components/Navbar';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import api from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });
  const [todos, setTodos] = useState([]);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTodos = async () => {
    setLoadingTodos(true);
    setError('');
    try {
      const { data } = await api.get('/todos');
      if (data.success) {
        setTodos(data.todos);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load tasks';
      setError(msg);
    } finally {
      setLoadingTodos(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/auth/me');
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchUser();
  }, []);

  const handleAdd = async (title) => {
    if (!title.trim()) {
      setError('Task title is required');
      return false;
    }
    setCreating(true);
    setError('');
    try {
      const { data } = await api.post('/todos', { title });
      if (data.success) {
        setTodos((prev) => [data.todo, ...prev]);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
      return false;
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const { data } = await api.put(`/todos/${id}`, { completed });
      if (data.success) {
        setTodos((prev) => prev.map((t) => (t._id === id ? data.todo : t)));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await api.delete(`/todos/${id}`);
      if (data.success) {
        setTodos((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const { data } = await api.put(`/todos/${id}`, updates);
      if (data.success) {
        setTodos((prev) => prev.map((t) => (t._id === id ? data.todo : t)));
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      return false;
    }
  };

  const filteredTodos = useMemo(() => {
    let result = todos;
    if (filter === 'active') result = result.filter((t) => !t.completed);
    if (filter === 'completed') result = result.filter((t) => t.completed);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }
    return result;
  }, [todos, filter, search]);

  const counts = useMemo(() => {
    return {
      all: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    };
  }, [todos]);

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar user={user} />

      <main className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Hero-band — 7/5 split: h1 + subhead + illustration card */}
        <section className="py-12 lg:py-[96px] grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="text-[12px] leading-[1.4] tracking-[1.5px] uppercase text-muted mb-4" style={{ fontWeight: 600 }}>
              Dashboard — Today
            </p>
            <h1
              className="text-[36px] sm:text-[56px] lg:text-[72px] leading-[1.0] tracking-[-2.5px] text-ink"
              style={{ fontWeight: 500 }}
            >
              Go to market
              <br />
              with your tasks.
            </h1>
            <p className="text-[16px] leading-[1.55] text-body mt-4 max-w-xl" style={{ fontWeight: 400 }}>
              Hello, <span className="text-body-strong" style={{ fontWeight: 600 }}>{user?.name || 'User'}</span> — here&apos;s what&apos;s on your plate today. Clay&apos;s playful system meets serious organization.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 bg-surface-card rounded-pill text-[12px] tracking-[1.5px] uppercase text-ink" style={{ fontWeight: 600 }}>
                {counts.all} total
              </span>
              <span className="text-[14px] text-muted" style={{ fontWeight: 400 }}>{counts.active} active · {counts.completed} done</span>
            </div>
          </div>
          {/* hero-illustration-card */}
          <div className="lg:col-span-5">
            <div className="bg-surface-soft rounded-xl p-8 lg:p-8 flex flex-col items-center justify-center min-h-[280px] border border-hairline/50">
              <div className="w-20 h-20 bg-brand-peach rounded-xl flex items-center justify-center mb-4">
                <Mountain className="w-10 h-10 text-ink" />
              </div>
              <p className="text-[12px] tracking-[1.5px] uppercase text-muted-soft" style={{ fontWeight: 600 }}>Claymation landscape</p>
              <p className="text-[16px] leading-[1.55] text-body text-center mt-2" style={{ fontWeight: 400 }}>
                3D mountains & mascot — brand voltage
              </p>
              <div className="mt-4 flex gap-2">
                <span className="w-3 h-3 bg-brand-pink rounded-full" />
                <span className="w-3 h-3 bg-brand-teal rounded-full" />
                <span className="w-3 h-3 bg-brand-lavender rounded-full" />
                <span className="w-3 h-3 bg-brand-ochre rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Feature cards — saturated single-color cards cycling pink → teal → lavender */}
        <section className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-brand-pink rounded-xl p-8 text-on-dark">
            <p className="text-[12px] tracking-[1.5px] uppercase opacity-80 mb-3" style={{ fontWeight: 600 }}>Feature — Sequencer</p>
            <h3 className="text-[18px] leading-[1.4] mb-2" style={{ fontWeight: 600 }}>Capture every idea</h3>
            <p className="text-[14px] leading-[1.55] opacity-90" style={{ fontWeight: 400 }}>Add tasks instantly — the peach card is where flow starts.</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-on-dark/15 rounded-md px-3 py-2 text-[13px]" style={{ fontWeight: 500 }}>
              <Layers className="w-4 h-4" /> {counts.active} active
            </div>
          </div>
          <div className="bg-brand-teal rounded-xl p-8 text-on-dark">
            <p className="text-[12px] tracking-[1.5px] uppercase opacity-60 mb-3" style={{ fontWeight: 600 }}>Feature — Featured tier</p>
            <h3 className="text-[18px] leading-[1.4] mb-2" style={{ fontWeight: 600 }}>Stay in flow</h3>
            <p className="text-[14px] leading-[1.55] opacity-80" style={{ fontWeight: 400 }}>Deep teal surfaces signal what&apos;s selected — like this featured check.</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-on-dark text-brand-teal rounded-md px-4 py-2 text-[14px]" style={{ fontWeight: 600 }}>
              Completed {counts.completed}
            </div>
          </div>
          <div className="bg-brand-lavender rounded-xl p-8 text-ink">
            <p className="text-[12px] tracking-[1.5px] uppercase text-ink/60 mb-3" style={{ fontWeight: 600 }}>Feature — Claygent</p>
            <h3 className="text-[18px] leading-[1.4] mb-2" style={{ fontWeight: 600 }}>Organize with warmth</h3>
            <p className="text-[14px] leading-[1.55] text-body" style={{ fontWeight: 400 }}>Lavender brings soft contrast — light saturations use dark text.</p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-canvas rounded-pill text-[13px] text-ink" style={{ fontWeight: 500 }}>{counts.all} tasks</span>
            </div>
          </div>
        </section>

        {/* Add task — feature-card-peach (warm peach feature card) */}
        <section className="bg-brand-peach rounded-xl p-8 lg:p-8 mb-[96px]">
          <div className="max-w-3xl">
            <p className="text-[12px] tracking-[1.5px] uppercase text-ink/70 mb-2" style={{ fontWeight: 600 }}>New task — Product UI fragment</p>
            <h2 className="text-[32px] leading-[1.15] tracking-[-0.5px] text-ink mb-6" style={{ fontWeight: 500 }}>
              Add a task to your system
            </h2>
            <div className="bg-canvas rounded-lg p-6 border border-hairline">
              <TodoForm onAdd={handleAdd} loading={creating} />
              {error && (
                <div className="mt-4 bg-error/10 border border-error/20 text-error px-4 py-3 rounded-md text-[14px] leading-[1.55]" style={{ fontWeight: 400 }}>
                  {error}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Filters — category-tab pills + text-input */}
        <section className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { key: 'all', label: `All (${counts.all})` },
              { key: 'active', label: `Active (${counts.active})` },
              { key: 'completed', label: `Completed (${counts.completed})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-[16px] py-[8px] text-[14px] leading-none rounded-pill border transition-colors ${
                  filter === tab.key
                    ? 'bg-surface-card text-ink border-hairline'
                    : 'bg-transparent text-muted border-transparent hover:text-ink'
                }`}
                style={{ fontWeight: filter === tab.key ? 600 : 500, height: '36px' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-soft" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-[16px] py-[12px] bg-canvas border border-hairline rounded-md text-[16px] leading-[1.55] placeholder:text-muted-soft text-ink focus:outline-none focus:border-ink transition-colors"
              style={{ fontWeight: 400, height: '44px' }}
            />
          </div>
        </section>

        {/* Todo list — product-mockup-card / pricing-tier-card style */}
        <section className="mb-12">
          {loadingTodos ? (
            <div className="bg-canvas border border-hairline rounded-lg p-12 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-muted mb-3" />
              <p className="text-[12px] tracking-[1.5px] uppercase text-muted-soft" style={{ fontWeight: 600 }}>Loading tasks…</p>
            </div>
          ) : (
            <TodoList
              todos={filteredTodos}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          )}
        </section>

        {/* CTA band — cta-band-illustrated (surface-soft, rounded xl, 80px padding) */}
        <section className="bg-surface-soft rounded-xl p-8 lg:p-[80px] mb-[96px] grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[12px] tracking-[1.5px] uppercase text-muted mb-3" style={{ fontWeight: 600 }}>Call to action</p>
            <h2 className="text-[40px] leading-[1.1] tracking-[-1px] text-ink" style={{ fontWeight: 500 }}>
              Turn your growth ideas into reality today.
            </h2>
            <p className="text-[16px] leading-[1.55] text-body mt-4" style={{ fontWeight: 400 }}>
              {counts.completed} of {counts.all} completed — keep the cream canvas rhythm with generous whitespace.
            </p>
            <button className="mt-6 inline-flex items-center gap-2 px-[20px] py-[12px] bg-primary text-on-primary rounded-md text-[14px] leading-none hover:bg-surface-dark transition-colors" style={{ fontWeight: 600, height: '44px' }}>
              <Sparkles className="w-4 h-4" />
              View progress
            </button>
          </div>
          <div className="bg-canvas rounded-xl p-6 border border-hairline">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] tracking-[1.5px] uppercase text-muted-soft" style={{ fontWeight: 600 }}>Progress — Clay system</span>
              <span className="px-3 py-1 bg-brand-ochre rounded-pill text-[12px] text-ink" style={{ fontWeight: 600 }}>Cream footer ahead</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[14px]" style={{ fontWeight: 500 }}>
                <span className="text-muted">Active</span>
                <span className="text-ink">{counts.active}</span>
              </div>
              <div className="h-2 bg-surface-card rounded-pill overflow-hidden">
                <div className="h-full bg-brand-teal rounded-pill transition-all" style={{ width: counts.all ? `${(counts.completed / counts.all) * 100}%` : '0%' }} />
              </div>
              <div className="flex gap-2 pt-2">
                <span className="flex-1 inline-flex justify-center px-3 py-2 bg-surface-card rounded-md text-[13px] text-ink" style={{ fontWeight: 500 }}>Active {counts.active}</span>
                <span className="flex-1 inline-flex justify-center px-3 py-2 bg-brand-teal text-on-dark rounded-md text-[13px]" style={{ fontWeight: 600 }}>Done {counts.completed}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer — cream-tinted, NOT dark */}
        <footer className="bg-surface-soft rounded-xl px-8 py-12 lg:py-[80px] grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-[14px] leading-[1.55] mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Layers className="w-4 h-4 text-on-primary" />
              </div>
              <span className="text-[16px] text-ink" style={{ fontWeight: 600 }}>Todo App</span>
            </div>
            <p className="text-body" style={{ fontWeight: 400 }}>Built on Clay&apos;s cream canvas — warm, playful, hand-crafted 3D energy.</p>
          </div>
          <div>
            <p className="text-[12px] tracking-[1.5px] uppercase text-muted-soft mb-3" style={{ fontWeight: 600 }}>Product</p>
            <ul className="space-y-2 text-muted" style={{ fontWeight: 400 }}>
              <li>Tasks</li><li>Boards</li><li>Agents</li>
            </ul>
          </div>
          <div>
            <p className="text-[12px] tracking-[1.5px] uppercase text-muted-soft mb-3" style={{ fontWeight: 600 }}>Resources</p>
            <ul className="space-y-2 text-muted" style={{ fontWeight: 400 }}>
              <li>Docs</li><li>Experts</li><li>Pricing</li>
            </ul>
          </div>
          <div>
            <p className="text-[12px] tracking-[1.5px] uppercase text-muted-soft mb-3" style={{ fontWeight: 600 }}>System</p>
            <p className="text-muted" style={{ fontWeight: 400 }}>Rounded display 500 · Feature cards 24px · Section 96px</p>
            <div className="mt-4 flex gap-2">
              <span className="w-6 h-6 bg-brand-pink rounded-xs" /><span className="w-6 h-6 bg-brand-teal rounded-xs" /><span className="w-6 h-6 bg-brand-lavender rounded-xs" />
            </div>
          </div>
        </footer>
        <div className="pb-8 text-center">
          <p className="text-[14px] text-muted-soft" style={{ fontWeight: 400 }}>© 2026 Todo App — Clay design system · Cream canvas #fffaf0</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
