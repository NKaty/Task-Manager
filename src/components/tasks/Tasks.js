import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import TaskList from '../taskList/TaskList'
import TaskListWithButton from '../taskList/TaskListWithButton'
import SortMenu from '../sortMenu/SortMenu'
import Pagination from '../pagination/Pagination'
import Modal from '../ui/Modal'
import CreateTaskForm from '../createTaskForm/CreateTaskForm'
import Loader from '../ui/Loader'
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
    const { tasks, total, page, tasksLoading, newTasks, newTasksLoading } = this.props

    const { sortBy, sortOrder } = this.state

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
        {(tasksLoading || newTasksLoading) && <Loader />}
        {!!newTasks.length && <TaskList tasks={newTasks} showBorder={true} />}
        <TaskListWithButton
          tasks={tasks}
          onClickCreateTaskHandler={this.onClickCreateTaskHandler}
        />
        <Pagination totalRecords={total} page={page} limit={3} pageNeighbours={1} />
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: ['1', '2'], //state.tasks.pagination.getIn([ownProps.page, 'ids']),
    newTasks: state.tasks.newTasks.get('ids').toArray(),
    total: state.tasks.total,
    sortBy: state.tasks.sortBy,
    sortOrder: state.tasks.sortOrder,
    tasksLoading: state.tasks.pagination.getIn([ownProps.page, 'loading']),
    newTasksLoading: state.tasks.newTasks.get('loading')
  }
}

export default connect(
  mapStateToProps,
  { loadTasksForPage }
)(Tasks)