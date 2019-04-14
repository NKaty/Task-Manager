import React from 'react'
import PropTypes from 'prop-types'
import TaskList from '../taskList/TaskList'
import Button from '../ui/Button'
import styled from 'styled-components'

const StyledTaskListWithButton = styled.div`
  margin-bottom: 2rem;
`

const TaskListWithButton = ({ tasks, onClickCreateTaskHandler }) => {
  return (
    <StyledTaskListWithButton>
      <TaskList tasks={tasks} />
      <Button btnType="action" onClickHandler={onClickCreateTaskHandler}>
        Создать задание
      </Button>
    </StyledTaskListWithButton>
  )
}

TaskListWithButton.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClickCreateTaskHandler: PropTypes.func.isRequired
}

export default TaskListWithButton
