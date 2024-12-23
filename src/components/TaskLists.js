import React from 'react'
import Task from './Task'

export default function TaskLists({ tasks,onToggleCompletion, onDelete, onStartEditing, onSaveDescription }) {
  return (
    <ul className="todo-list">
      {tasks.map((task, index) => (
        <Task
          key={index}
          description={task.description}
          created={task.created}
          completed={task.completed}
          editing={task.editing}
          onToggleCompletion={() => onToggleCompletion(index)}
          onDelete={() => onDelete(index)}
          onStartEditing={() => onStartEditing(index)}
          onSaveDescription={(newDescription) => onSaveDescription(index, newDescription)}
        />
      ))}
    </ul>
  )
}
