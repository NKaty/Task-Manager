import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '../ui/Button'
import Card from '../card/Card'
import CardInfo from '../card/CardInfo'
import CardMenu from '../card/CardMenu'
import { taskSelector, adminAccessSelector } from '../../selectors'
import { typeTask } from '../../types'
import { openModal, enterEditMode } from '../../actions'
import styled from 'styled-components'

const StyledTask = styled(Card)`
  border: 1px solid ${({ status }) => (status === 'danger' && '#f7d7e1') || '#c2e9f9'};
`

const TaskInfo = styled(CardInfo)`
  padding: 1rem;
  span {
    padding-top: 0.5rem;
    margin-right: 1.5rem;
    color: #545353;
  }

  span:nth-of-type(3) strong {
    font-weight: 400;
    padding: 0.3rem;
    background-color: ${({ status }) => (status === 'danger' && '#fceaf0') || '#e8f6fc'};
    border-radius: 2px;
  }
`

const Task = ({ task, isAdmin, openModal, enterEditMode }) => {
  const onClickEditTaskHandler = event => {
    event.preventDefault()
    openModal('TaskForm', 'edit')
    enterEditMode(task.id)
  }
  return (
    <StyledTask status={!!task.status ? 'info' : 'danger'}>
      <TaskInfo status={!!task.status ? 'info' : 'danger'}>
        <p>{task.text}</p>
        <p>
          <span>Автор: {task.username}</span>
          <span>Email: {task.email}</span>
          <span>
            Статус: <strong>{!!task.status ? 'Выполнено' : 'Не выполнено'}</strong>
          </span>
        </p>
      </TaskInfo>
      <CardMenu>
        <Button btnType="action" disabled={!isAdmin} onClickHandler={onClickEditTaskHandler}>
          Редактировать
        </Button>
      </CardMenu>
    </StyledTask>
  )
}

Task.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  task: typeTask.isRequired,
  openModal: PropTypes.func.isRequired
}

StyledTask.propTypes = {
  status: PropTypes.string.isRequired
}

TaskInfo.propTypes = {
  status: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAdmin: adminAccessSelector(state),
    task: taskSelector(state, ownProps)
  }
}

export default connect(
  mapStateToProps,
  { openModal, enterEditMode }
)(Task)
