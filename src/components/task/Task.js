import React from 'react'
import { connect } from 'react-redux'
import Button from '../ui/Button'
import Card from '../card/Card'
import CardInfo from '../card/CardInfo'
import CardMenu from '../card/CardMenu'
import { taskSelector } from '../../selectors'
import { typeTask } from '../../types'
import styled from 'styled-components'

const StyledTask = styled(Card)`
  border: 1px solid #eae5e5;
`

const TaskInfo = styled(CardInfo)`
  padding: 1rem;
  span {
    padding-top: 0.5rem;
    margin-right: 1.5rem;
    color: #545353;
  }
`

const Task = ({ task }) => {
  return (
    <StyledTask>
      <TaskInfo>
        <p>{task.text}</p>
        <p>
          <span>Автор: {task.username}</span>
          <span>Email: {task.email}</span>
          <span> Статус: {!!task.status ? 'Выполнено' : 'Не выполнено'}</span>
        </p>
      </TaskInfo>
      <CardMenu>
        <Button btnType="action" disabled={true}>
          Редактировать
        </Button>
      </CardMenu>
    </StyledTask>
  )
}

Task.propTypes = {
  task: typeTask.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    task: taskSelector(state, ownProps)
  }
}

export default connect(mapStateToProps)(Task)
