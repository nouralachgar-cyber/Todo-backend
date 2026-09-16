import TodoItem from './TodoItem';
import { ClipboardList } from 'lucide-react';

const TodoList = ({ todos, onToggle, onDelete, onUpdate }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-surface-card rounded-lg border border-hairline">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-canvas rounded-xl border border-hairline mb-4">
          <ClipboardList className="w-8 h-8 text-muted-soft" />
        </div>
        <p className="text-[12px] leading-[1.4] tracking-[1.5px] uppercase text-muted-soft mb-2" style={{ fontWeight: 600 }}>
          No tasks yet
        </p>
        <h3 className="text-[18px] leading-[1.4] text-ink mb-1" style={{ fontWeight: 600 }}>
          Your list is empty
        </h3>
        <p className="text-[14px] leading-[1.55] text-muted max-w-sm mx-auto" style={{ fontWeight: 400 }}>
          Add your first task above and stay organized. Your todos will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default TodoList;
