import React from 'react'
import Button from '../ui/Button'
import Card from '../card/Card'
import CardInfo from '../card/CardInfo'
import CardMenu from '../card/CardMenu'
import { connect } from 'react-redux'
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
      <TaskInfo direction="row">
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

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.tasks.entities.get(ownProps.id)
  }
}

export default connect(mapStateToProps)(Task)
