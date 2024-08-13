import React from 'react';

type TodoItemProps = {
  task: { text: string; completed: boolean };
  onToggle: () => void;
};

function TodoItem({ task, onToggle }: TodoItemProps): JSX.Element {
  return (
    <div className="todo-item-content">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle} 
      />
      <span>{task.text}</span>
    </div>
  );
}

export default TodoItem;
