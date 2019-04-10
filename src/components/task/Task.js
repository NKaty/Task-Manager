import React from 'react'
import Button from '../ui/Button'
import { connect } from 'react-redux'
import styled from 'styled-components'

const StyledTask = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  border: 1px solid #eae5e5;

  @media (min-width: 500px) {
    flex-wrap: nowrap;
  }
`
const TaskInfo = styled.div`
  flex: 1 auto;

  p:last-of-type {
    display: flex;
    flex-wrap: wrap;
  }

  span {
    padding-top: 0.5rem;
    margin-right: 1.5rem;
    color: #545353;
  }
`
const TaskMenu = styled.div`
  display: flex;
  align-items: center;
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
      <TaskMenu>
        <Button btnType="action" disabled={true}>
          Редактировать
        </Button>
      </TaskMenu>
    </StyledTask>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.tasks.entities.get(ownProps.id)
  }
}

export default connect(mapStateToProps)(Task)
