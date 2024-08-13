import React, { useState } from 'react';
import TodoList from './components/TodoList';

type Filter = 'all' | 'active' | 'completed';

function App(): JSX.Element {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');
  const [showAll, setShowAll] = useState<boolean>(true);

  const handleAddTask = (): void => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  const handleClearCompleted = (): void => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>todos</h1>
      <div className="todo-input">
        <button
          type="button"
          className={`toggle-all ${showAll ? 'expanded' : ''}`}
          onClick={() => setShowAll(!showAll)}
        >
          <span className="sr-only">Toggle all tasks</span>
        </button>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
      </div>
      <TodoList tasks={filteredTasks} setTasks={setTasks} showAll={showAll} />
      <div className="todo-footer">
        <span>{tasks.filter((task) => !task.completed).length} items left</span>
        <div className="filters">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'selected' : ''}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'selected' : ''}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'selected' : ''}
          >
            Completed
          </button>
        </div>
        <button type="button" className="clear-completed" onClick={handleClearCompleted}>
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default App;
