import React from 'react'
import { connect } from 'react-redux'

const Task = ({ task }) => {
  return (
    <div>
      <p>
        Задание: {task.text} Автор: {task.username}
      </p>
      <p>
        Email: {task.email} Статус: {!!task.status ? 'Выполнено' : 'Не выполнено'}
      </p>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.tasks.entities.get(ownProps.id)
  }
}

export default connect(mapStateToProps)(Task)
