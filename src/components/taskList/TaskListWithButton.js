import React from 'react'
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

export default TaskListWithButton
