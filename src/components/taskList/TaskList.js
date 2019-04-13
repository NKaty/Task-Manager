import React, { Fragment } from 'react'
import Task from '../task/Task'
import styled from 'styled-components'

const StyledTaskList = styled.ul`
  list-style: none;
  margin: 1rem 0 1rem 0;
  padding: 1rem;
  border: ${({ showBorder }) => (showBorder ? '1px solid #db7093' : 'none')};

  li {
    margin-bottom: 1rem;
  }

  li:last-of-type {
    margin-bottom: 0;
  }
`

const Message = styled.h3`
  margin-top: 0;
  margin-left: 1rem;
`

const TaskList = ({ tasks, showBorder }) => {
  return (
    <Fragment>
      {!!tasks.length ? (
        <StyledTaskList showBorder={showBorder}>
          {tasks.map(id => (
            <li key={id}>
              <Task id={id} />
            </li>
          ))}
        </StyledTaskList>
      ) : (
        <Message>Заданий еще нет.</Message>
      )}
    </Fragment>
  )
}

export default TaskList
