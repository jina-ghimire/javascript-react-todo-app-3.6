import React from 'react'
import Task from './Task'

export default function TaskLists({ tasks,onToggleCompletion, onDelete, onStartEditing, onSaveDescription }) {
  return (
    <ul className="todo-list">
      {tasks.map((task, id) => (
        <Task
          key={task.id}
          description={task.description}
          created={task.created}
          completed={task.completed}
          editing={task.editing}
          onToggleCompletion={() => onToggleCompletion(task.id)} // Pass task.id
          onDelete={() => onDelete(task.id)} // Pass task.id
          onStartEditing={() => onStartEditing(task.id)} // Pass task.id
          onSaveDescription={(newDescription) =>
            onSaveDescription(task.id, newDescription)}
        />
      ))}
    </ul>
  )
}
