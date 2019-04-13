import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import TaskList from '../taskList/TaskList'
import TaskListWithButton from '../taskList/TaskListWithButton'
import SortMenu from '../sortMenu/SortMenu'
import Pagination from '../pagination/Pagination'
import Modal from '../ui/Modal'
import CreateTaskForm from '../createTaskForm/CreateTaskForm'
import Loader from '../ui/Loader'
import {
  totalTasksSelector,
  tasksPageSelector,
  sortBySelector,
  sortOrderSelector,
  newTasksSelector,
  newTaskLoadingSelector,
  tasksPageLoadingSelector
} from '../../selectors'
import { loadTasksForPage } from '../../actions'

class Tasks extends Component {
  state = {
    sortBy: this.props.sortBy,
    sortOrder: this.props.sortOrder,
    isCreateTaskFormShown: false
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const { loadTasksForPage, page } = this.props
    const { sortBy, sortOrder } = this.state
    loadTasksForPage(page, sortBy, sortOrder)
  }

  onSortChangeHandler = opt => {
    this.setState({ [opt.name]: opt.value })
  }

  onClickSortHandler = event => {
    event.preventDefault()
    this.fetchData()
  }

  onClickResetSortHandler = event => {
    event.preventDefault()
    this.setState({ sortBy: 'none', sortOrder: 'none' }, () => this.fetchData()) //componentDidUpdate
  }

  onClickCreateTaskHandler = event => {
    event.preventDefault()
    this.setState({ isCreateTaskFormShown: true })
  }

  onCloseTaskFormHandler = event => {
    event && event.preventDefault()
    this.setState({ isCreateTaskFormShown: false })
  }

  // If do rendering through children, modal component does unnecessary re-rendering
  modalRender = () => <CreateTaskForm closeFormHandler={this.onCloseTaskFormHandler} />

  render() {
    const { tasks, total, page, tasksLoading, newTasks, newTaskLoading } = this.props

    const { sortBy, sortOrder } = this.state

    console.log(tasks)

    return (
      <Fragment>
        <Modal
          modalCancel={this.onCloseTaskFormHandler}
          show={this.state.isCreateTaskFormShown}
          render={this.modalRender}
        />
        <SortMenu
          sortBy={sortBy}
          sortOrder={sortOrder}
          onClickSort={this.onClickSortHandler}
          onSortChange={this.onSortChangeHandler}
          onClickResetSort={this.onClickResetSortHandler}
        />
        {(tasksLoading || newTaskLoading) && <Loader />}
        {newTasks && !!newTasks.length && <TaskList tasks={newTasks} showBorder={true} />}
        {tasks && (
          <TaskListWithButton
            tasks={tasks}
            onClickCreateTaskHandler={this.onClickCreateTaskHandler}
          />
        )}
        <Pagination totalRecords={total} page={page} limit={3} pageNeighbours={1} />
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: tasksPageSelector(state, ownProps),
    newTasks: newTasksSelector(state),
    total: totalTasksSelector(state),
    sortBy: sortBySelector(state),
    sortOrder: sortOrderSelector(state),
    tasksLoading: tasksPageLoadingSelector(state, ownProps),
    newTaskLoading: newTaskLoadingSelector(state)
  }
}

export default connect(
  mapStateToProps,
  { loadTasksForPage }
)(Tasks)
