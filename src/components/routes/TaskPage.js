import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Tasks from '../tasks/Tasks'

const TasksPage = () => {
  const getTasks = ({ match }) => {
    if (!match) return <Redirect to="/1" />

    const { page } = match.params
    const currentPage = parseInt(page, 10)
    if (isNaN(currentPage)) return <Redirect to="/1" />

    return <Tasks page={currentPage} />
  }

  return <Route path="/:page" children={getTasks} exact />
}

export default TasksPage
