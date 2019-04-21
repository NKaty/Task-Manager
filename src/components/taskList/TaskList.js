import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Task from '../task/Task'
import styled from 'styled-components'

const StyledTaskList = styled.ul`
  list-style: none;
  margin: 1rem 0 1rem 0;
  padding: 1rem;
  border: ${({ showBorder }) => (showBorder ? '2px dashed #ffcb05;' : 'none')};

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

TaskList.defaultProps = {
  showBorder: false
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.number).isRequired,
  showBorder: PropTypes.bool
}

StyledTaskList.propTypes = {
  showBorder: PropTypes.bool.isRequired
}

export default TaskList
