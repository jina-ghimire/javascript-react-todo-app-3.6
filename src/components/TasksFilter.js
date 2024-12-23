import React from 'react'

export default function TasksFilter({ filter, setFilter }) {
  return (
    <ul className="filters">
      {['All', 'Active', 'Completed'].map((f) => (
        <li key={f}>
          <button
            className={filter === f ? 'selected' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        </li>
      ))}
    </ul>
  );
}
