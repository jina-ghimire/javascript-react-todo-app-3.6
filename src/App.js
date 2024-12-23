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

  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const startEditingTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, editing: true } : task
      )
    );
  };

  const saveTaskDescription = (index, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, description: newDescription, editing: false } : task
      )
    );
  };

  const addTask = (description) => {
    const newTask = {
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
