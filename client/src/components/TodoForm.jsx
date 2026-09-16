import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

const TodoForm = ({ onAdd, loading }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const success = await onAdd(title.trim());
    if (success) {
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-[16px] py-[12px] bg-canvas border border-hairline rounded-md text-[16px] leading-[1.55] placeholder:text-muted-soft text-ink focus:outline-none focus:border-ink transition-colors"
        style={{ fontWeight: 400, height: '44px' }}
      />
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="inline-flex items-center justify-center gap-2 px-[20px] py-[12px] bg-primary text-on-primary rounded-md text-[14px] leading-none disabled:bg-primary/30 disabled:cursor-not-allowed hover:bg-surface-dark transition-colors whitespace-nowrap"
        style={{ fontWeight: 600, height: '44px' }}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        Add task
      </button>
    </form>
  );
};

export default TodoForm;
