import React, { useEffect, useRef } from 'react';
import TodoItem from './TodoItem';

type TodoListProps = {
  tasks: { text: string; completed: boolean }[];
  setTasks: React.Dispatch<React.SetStateAction<{ text: string; completed: boolean }[]>>;
  showAll: boolean;
};

function TodoList({ tasks, setTasks, showAll }: TodoListProps): JSX.Element {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const { scrollHeight } = listRef.current;
      if (showAll) {
        listRef.current.style.maxHeight = `${scrollHeight}px`;
        listRef.current.style.opacity = '1';
      } else {
        listRef.current.style.maxHeight = '0px';
        listRef.current.style.opacity = '0';
      }
    }
  }, [tasks, showAll]);

  const handleToggleTask = (index: number): void => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task,
    );
    setTasks(newTasks);
  };

  return (
    <div
      className="todo-list"
      ref={listRef}
      style={{ overflow: 'hidden', transition: 'max-height 0.3s ease, opacity 0.3s ease' }}
    >
      {tasks.map((task, index) => (
        <div key={index} className={`todo-item ${task.completed ? 'completed' : ''}`}>
          <TodoItem task={task} onToggle={() => handleToggleTask(index)} />
        </div>
      ))}
    </div>
  );
}

export default TodoList;
