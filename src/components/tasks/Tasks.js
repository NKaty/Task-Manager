import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskList from '../taskList/TaskList'
import NewTaskList from '../newTaskList/NewTaskList'
import SortMenu from '../sortMenu/SortMenu'
import Pagination from '../paganation/Paganation'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import CreateTaskForm from '../createTaskForm/CreateTaskForm'
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
    const {
      tasks,
      total,
      page,
      tasksLoading,
      newTasks,
      newTasksLoading,
      newTasksError
    } = this.props

    const { sortBy, sortOrder } = this.state

    return (
      <div>
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
        <NewTaskList tasks={newTasks} loading={newTasksLoading} errors={newTasksError} />
        {tasksLoading || !tasks ? <div>Loading...</div> : <TaskList tasks={tasks} />}
        <Button btnType="action" onClickHandler={this.onClickCreateTaskHandler} disabled={false}>
          Создать задание
        </Button>
        <Pagination totalRecords={total} page={page} limit={3} pageNeighbours={1} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks.pagination.getIn([ownProps.page, 'ids']),
    newTasks: state.tasks.newTasks.get('ids').toArray(),
    total: state.tasks.total,
    sortBy: state.tasks.sortBy,
    sortOrder: state.tasks.sortOrder,
    tasksLoading: state.tasks.pagination.getIn([ownProps.page, 'loading']),
    newTasksLoading: state.tasks.newTasks.get('loading'),
    newTasksError: state.tasks.newTasks.get('error')
  }
}

export default connect(
  mapStateToProps,
  { loadTasksForPage }
)(Tasks)
