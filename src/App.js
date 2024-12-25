import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import NewTaskForm from './components/NewTaskForm';
import TaskLists from './components/TaskLists';
import './App.css';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        const formattedTasks = data.slice(0, 20).map((task) => ({
          id: task.id,
          description: task.title,
          created: new Date(), 
          completed: task.completed,
          editing: false,
        }));
        setTasks(formattedTasks);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const startEditingTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id? { ...task, editing: true } : task
      )
    );
  };

  const saveTaskDescription = (id, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
         task.id === id ? { ...task, description: newDescription, editing: false } : task
      )
    );
  };

  const addTask = (description) => {
    const newTask = {
      id: Date.now(),
      description,
      created: new Date(),
      completed: false,
      editing: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const activeTasksCount = tasks.filter((task) => !task.completed).length;

  return (
    <section className="todo-app">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      <section className="main">
        <TaskLists
          tasks={filteredTasks}
          onToggleCompletion={toggleTaskCompletion}
          onDelete={deleteTask}
          onStartEditing={startEditingTask}
          onSaveDescription={saveTaskDescription}
        />
        <Footer
          count={activeTasksCount}
          onClearCompleted={clearCompletedTasks}
          filter={filter}
          setFilter={setFilter}
        />
      </section>
    </section>
  );
}

export default App;
