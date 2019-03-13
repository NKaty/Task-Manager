import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import TasksList from '../tasksList/TasksList'

class TasksPage extends Component {
  render() {
    return (
      <div>
        <Route path="/:page" children={this.getTasks} exact />
      </div>
    )
  }

  getTasks = ({ match }) => {
    if (!match) return <Redirect to="/1" />

    const { page } = match.params
    if (isNaN(page)) return <Redirect to="/1" />

    return <TasksList key={page} page={page} />
  }
}

export default TasksPage
