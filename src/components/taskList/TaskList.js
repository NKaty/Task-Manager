import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Task from '../task/Task'
import Button from '../ui/Button'
import styled from 'styled-components'

const TaskListWrapper = styled.div`
  text-align: center;
  margin-bottom: ${({ isCreateButton }) => (isCreateButton ? '2rem' : '0')};

  @media (min-width: 600px) {
    text-align: left;
  }
`

const StyledTaskList = styled.ul`
  list-style: none;
  margin: 1rem 0 1rem 0;
  padding: 1rem;
  border: ${({ showBorder }) => (showBorder ? '2px dashed #ffcb05' : 'none')};

  li {
    margin-bottom: 1rem;
    text-align: left;
  }

  li:last-of-type {
    margin-bottom: 0;
  }
`

const Message = styled.h3`
  margin-top: 0;
  margin-left: 1rem;
`

class TaskList extends PureComponent {
  render() {
    const { tasks, showBorder, isCreateButton, onClickCreateTaskHandler } = this.props

    return (
      <TaskListWrapper isCreateButton={isCreateButton}>
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
        {isCreateButton && (
          <Button btnType="action" onClickHandler={onClickCreateTaskHandler}>
            Создать задание
          </Button>
        )}
      </TaskListWrapper>
    )
  }
}

TaskList.defaultProps = {
  showBorder: false,
  isCreateButton: false,
  onClickCreateTaskHandler: () => {}
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.number).isRequired,
  showBorder: PropTypes.bool,
  isCreateButton: PropTypes.bool,
  onClickCreateTaskHandler: PropTypes.func
}

StyledTaskList.propTypes = {
  showBorder: PropTypes.bool.isRequired
}

TaskListWrapper.propTypes = {
  isCreateButton: PropTypes.bool.isRequired
}

export default TaskList
