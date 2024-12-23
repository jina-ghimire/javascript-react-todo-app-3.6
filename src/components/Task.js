import React,{useState} from 'react'
import { format } from 'date-fns'

export default function Task({ description, created, completed, editing,onToggleCompletion, onDelete, onStartEditing, onSaveDescription }) {
  const [editValue, setEditValue] = useState(description);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSaveDescription(editValue);
    }
  };
  return (
    <li className={`${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" defaultChecked={completed} onChange={onToggleCompletion} />
        <label>
          <span className="description">{description}</span>
          <span className="created">{format(created, 'PPpp')}</span>
        </label>
        <button className="icon icon-edit" onClick={onStartEditing}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      {editing && <input type="text" className="edit" defaultValue={description} onChange={(e) => setEditValue(e.target.value)}  onKeyDown={handleKeyDown} />}
    </li>
  )
}
