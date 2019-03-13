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
    const currentPage = parseInt(page, 10)
    if (isNaN(currentPage)) return <Redirect to="/1" />

    return <TasksList key={page} page={currentPage} />
  }
}

export default TasksPage
