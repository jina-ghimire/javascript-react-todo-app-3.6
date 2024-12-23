import React from 'react'
import TasksFilter from './TasksFilter'

export default function Footer({count, onClearCompleted, filter, setFilter}) {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter filter={filter} setFilter={setFilter} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
