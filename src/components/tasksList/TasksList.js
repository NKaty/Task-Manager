import React, { Component } from 'react'
import { connect } from 'react-redux'
import Task from '../task/Task'
import Pagination from '../paganation/Paganation'
import { loadTasksForPage } from '../../actions'

class TasksList extends Component {
  componentDidMount() {
    const { loadTasksForPage, page, tasks } = this.props
    if (!tasks) loadTasksForPage(page)
  }

  render() {
    const { tasks, total, page, loading } = this.props
    if (!total) return <div>Loading...</div>
    if (loading || !tasks) return <div>Loading...</div>
    return (
      <div>
        <ul>
          {tasks.map(id => (
            <li key={id}>
              <Task id={id} />
            </li>
          ))}
        </ul>
        <Pagination totalRecords={total} page={page} limit={3} pageNeighbours={1} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks.pagination.getIn([ownProps.page, 'ids']),
    total: state.tasks.total,
    loading: state.tasks.pagination.getIn([ownProps.page, 'loading'])
  }
}

export default connect(
  mapStateToProps,
  { loadTasksForPage }
)(TasksList)
