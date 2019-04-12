import React, { Fragment } from 'react'
import TaskList from '../taskList/TaskList'

const NewTaskList = ({ loading, tasks }) => {
  return (
    <Fragment>
      {loading && <div>Loading...</div>}
      {!!tasks.length && <TaskList tasks={tasks} showBorder={true} />}
    </Fragment>
  )
}

export default NewTaskList
