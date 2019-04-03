import React, { Component } from 'react'
import { connect } from 'react-redux'
import Task from '../task/Task'
import Pagination from '../paganation/Paganation'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import CreateTaskForm from '../createTaskForm/CreateTaskForm'
import { loadTasksForPage } from '../../actions'

const sortByOptions = [
  { value: 'username', displayValue: 'имени пользователя' },
  { value: 'email', displayValue: 'email' },
  { value: 'status', displayValue: 'статусу' },
  { value: 'none', displayValue: 'none' }
]
const sortOrderOptions = [
  { value: 'asc', displayValue: 'возрастания' },
  { value: 'desc', displayValue: 'убывания' },
  { value: 'none', displayValue: 'none' }
]

class TasksList extends Component {
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

  onSortChangeHandler = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value })
  }

  onClickSortHandler = event => {
    event.preventDefault()
    this.fetchData()
  }

  onClickResetSortHandler = event => {
    event.preventDefault()
    this.setState({ sortBy: 'none', sortOrder: 'none' }, () => this.fetchData()) //componentDidUpdate
  }

  get sortTasksMenu() {
    const { sortBy, sortOrder } = this.state
    return (
      <div>
        <Button
          btnType="action"
          onClickHandler={this.onClickSortHandler}
          disabled={sortBy === 'none' || sortOrder === 'none'}
        >
          Сортировать
        </Button>
        <Input
          elementType="select"
          label="по"
          value={this.state.sortBy}
          elementConfig={{ name: 'sortBy', options: sortByOptions }}
          onChangeHandler={this.onSortChangeHandler}
        />
        <Input
          elementType="select"
          label="в порядке"
          value={this.state.sortOrder}
          elementConfig={{ name: 'sortOrder', options: sortOrderOptions }}
          onChangeHandler={this.onSortChangeHandler}
        />
        <Button btnType="action" onClickHandler={this.onClickResetSortHandler} disabled={false}>
          Убрать сортировку
        </Button>
      </div>
    )
  }

  onClickCreateTaskHandler = event => {
    event.preventDefault()
    this.setState({ isCreateTaskFormShown: true })
  }

  createTaskCancelHandler = () => {
    this.setState({ isCreateTaskFormShown: false })
  }

  render() {
    const { tasks, total, page, loading } = this.props
    if (!total) return <div>Loading...</div>
    if (loading || !tasks) return <div>Loading...</div>
    return (
      <div>
        <Modal modalCancel={this.createTaskCancelHandler} show={this.state.isCreateTaskFormShown}>
          <CreateTaskForm taskCancelHandler={this.createTaskCancelHandler} />
        </Modal>
        {this.sortTasksMenu}
        <ul>
          {tasks.map(id => (
            <li key={id}>
              <Task id={id} />
            </li>
          ))}
        </ul>
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
    total: state.tasks.total,
    sortBy: state.tasks.sortBy,
    sortOrder: state.tasks.sortOrder,
    loading: state.tasks.pagination.getIn([ownProps.page, 'loading'])
  }
}

export default connect(
  mapStateToProps,
  { loadTasksForPage }
)(TasksList)
