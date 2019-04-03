import React from 'react'
import Task from '../task/Task'

const TaskList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map(id => (
        <li key={id}>
          <Task id={id} />
        </li>
      ))}
    </ul>
  )
}

export default TaskList
