import React from 'react'
import { connect } from 'react-redux'

function Task({ task }) {
  return (
    <div>
      <p>
        {task.text} <b>by {task.username}</b>
      </p>
      <p>
        {task.email} {task.status}
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
