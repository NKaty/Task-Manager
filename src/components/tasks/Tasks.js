import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TaskList from '../taskList/TaskList'
import SortMenu from '../sortMenu/SortMenu'
import Pagination from '../pagination/Pagination'
import Loader from '../ui/Loader'
import {
  totalTasksSelector,
  tasksPageSelector,
  sortBySelector,
  sortOrderSelector,
  newTasksSelector,
  newTaskLoadingSelector,
  tasksPageLoadingSelector,
  tasksPageLoadedSelector,
  newTaskLoadedSelector,
  editedTaskLoadingSelector
} from '../../selectors'
import { loadTasksForPage, openModal } from '../../actions'

class Tasks extends Component {
  state = {
    sortBy: this.props.sortBy,
    sortOrder: this.props.sortOrder
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) this.fetchData()
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
    this.setState({ sortBy: 'none', sortOrder: 'none' }, () => this.fetchData())
  }

  render() {
    const {
      tasks,
      total,
      page,
      tasksLoading,
      newTasks,
      newTaskLoading,
      tasksLoaded,
      newTaskLoaded,
      editedTaskLoading,
      openModal
    } = this.props

    const { sortBy, sortOrder } = this.state

    return (
      <main>
        <SortMenu
          sortBy={sortBy}
          sortOrder={sortOrder}
          onClickSort={this.onClickSortHandler}
          onSortChange={this.onSortChangeHandler}
          onClickResetSort={this.onClickResetSortHandler}
        />
        {(tasksLoading || newTaskLoading || editedTaskLoading) && <Loader />}
        {newTaskLoaded && !!newTasks.length && <TaskList tasks={newTasks} showBorder={true} />}
        {tasksLoaded && <TaskList tasks={tasks} isCreateButton={true} openModal={openModal} />}
        {<Pagination totalRecords={total} page={page} />}
      </main>
    )
  }
}

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.number),
  newTasks: PropTypes.arrayOf(PropTypes.number).isRequired,
  total: PropTypes.number,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  tasksLoading: PropTypes.bool,
  newTaskLoading: PropTypes.bool,
  tasksLoaded: PropTypes.bool,
  newTaskLoaded: PropTypes.bool,
  editedTaskLoading: PropTypes.bool,
  page: PropTypes.number.isRequired,
  loadTasksForPage: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: tasksPageSelector(state, ownProps),
    newTasks: newTasksSelector(state),
    total: totalTasksSelector(state),
    sortBy: sortBySelector(state),
    sortOrder: sortOrderSelector(state),
    tasksLoading: tasksPageLoadingSelector(state, ownProps),
    tasksLoaded: tasksPageLoadedSelector(state, ownProps),
    newTaskLoading: newTaskLoadingSelector(state),
    newTaskLoaded: newTaskLoadedSelector(state),
    editedTaskLoading: editedTaskLoadingSelector(state)
  }
}

export default connect(
  mapStateToProps,
  { loadTasksForPage, openModal }
)(Tasks)
