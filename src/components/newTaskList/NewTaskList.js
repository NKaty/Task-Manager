import React, { Fragment } from 'react'
import TaskList from '../taskList/TaskList'

const NewTaskList = ({ loading, errors, tasks }) => {
  return (
    <Fragment>
      {loading && <div>Loading...</div>}
      {errors && (
        <div>
          <p>Новое задание не удалось создать. Причины:</p>
          <ul>
            {Object.keys(errors).map(error => (
              <li>
                {error}: {errors[error]}
              </li>
            ))}
          </ul>
        </div>
      )}
      <TaskList tasks={tasks} />
    </Fragment>
  )
}

export default NewTaskList
