import React from 'react'
import Task from '../task/Task'
import styled from 'styled-components'

const StyledTaskList = styled.ul`
  align-self: stretch;
  list-style: none;
  margin: 0 0 2rem 0;
  padding: 1rem;
  border: ${({ showBorder }) => (showBorder ? '1px solid #db7093' : 'none')};

  li {
    margin-bottom: 1rem;
  }

  li:last-of-type {
    margin-bottom: 0;
  }
`

const TaskList = ({ tasks, showBorder }) => {
  return (
    <StyledTaskList showBorder={showBorder}>
      {tasks.map(id => (
        <li key={id}>
          <Task id={id} />
        </li>
      ))}
    </StyledTaskList>
  )
}

export default TaskList
