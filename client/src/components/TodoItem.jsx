import { useState } from 'react';
import { Pencil, Trash2, Check, X, Loader2 } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleToggle = async () => {
    setUpdating(true);
    await onToggle(todo._id, !todo.completed);
    setUpdating(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(todo._id);
    setDeleting(false);
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    setUpdating(true);
    const success = await onUpdate(todo._id, { title: editTitle.trim() });
    setUpdating(false);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div
      className={`group flex items-center gap-3 p-6 bg-canvas border rounded-lg transition-colors ${
        todo.completed ? 'bg-surface-card border-hairline' : 'border-hairline hover:border-ink/10'
      }`}
    >
      {/* Checkbox — rounded pill style */}
      <button
        onClick={handleToggle}
        disabled={updating}
        className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-success border-success text-on-primary'
            : 'border-hairline bg-canvas hover:border-ink'
        }`}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
      >
        {updating ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : todo.completed ? (
          <Check className="w-4 h-4" />
        ) : null}
      </button>

      {/* Title / Edit Input */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-[16px] py-[12px] text-[16px] leading-[1.55] border border-ink rounded-md focus:outline-none bg-canvas text-ink"
            style={{ fontWeight: 400, height: '44px' }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
          />
        ) : (
          <p
            className={`text-[16px] leading-[1.55] truncate pr-2 ${todo.completed ? 'line-through text-muted-soft' : 'text-body-strong'}`}
            style={{ fontWeight: todo.completed ? 400 : 600 }}
          >
            {todo.title}
          </p>
        )}
      </div>

      {/* Actions — pill + rounded-md per Clay */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={updating || !editTitle.trim()}
              className="w-9 h-9 flex items-center justify-center bg-primary text-on-primary rounded-md disabled:opacity-40 hover:bg-surface-dark transition-colors"
              title="Save"
            >
              {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCancel}
              disabled={updating}
              className="w-9 h-9 flex items-center justify-center bg-canvas border border-hairline text-ink rounded-md hover:border-ink transition-colors"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="w-9 h-9 flex items-center justify-center bg-surface-card text-ink rounded-md hover:bg-surface-strong transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="w-9 h-9 flex items-center justify-center bg-surface-card text-ink rounded-md hover:bg-error/10 hover:text-error transition-colors"
              title="Delete"
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
