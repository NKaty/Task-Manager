import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TaskList from '../taskList/TaskList'
import TaskListWithButton from '../taskList/TaskListWithButton'
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
  newTaskLoadedSelector
} from '../../selectors'
import { loadTasksForPage, openModal } from '../../actions'

class Tasks extends Component {
  state = {
    sortBy: this.props.sortBy,
    sortOrder: this.props.sortOrder
  }

  componentDidMount() {
    console.log(111)
    this.fetchData()
  }

  componentDidUpdate() {
    console.log(222)
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
    this.props.openModal('TaskForm', 'create')
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
      newTaskLoaded
    } = this.props

    const { sortBy, sortOrder } = this.state

    console.log(tasks)

    return (
      <Fragment>
        <SortMenu
          sortBy={sortBy}
          sortOrder={sortOrder}
          onClickSort={this.onClickSortHandler}
          onSortChange={this.onSortChangeHandler}
          onClickResetSort={this.onClickResetSortHandler}
        />
        {(tasksLoading || newTaskLoading) && <Loader />}
        {newTaskLoaded && !!newTasks.length && <TaskList tasks={newTasks} showBorder={true} />}
        {tasksLoaded && (
          <TaskListWithButton
            tasks={tasks}
            onClickCreateTaskHandler={this.onClickCreateTaskHandler}
          />
        )}
        {<Pagination totalRecords={total} page={page} limit={3} pageNeighbours={1} />}
      </Fragment>
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
    newTaskLoaded: newTaskLoadedSelector(state)
  }
}

export default connect(
  mapStateToProps,
  { loadTasksForPage, openModal }
)(Tasks)
