import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from '../form/Form'
import CreateTaskForm from './CreateTaskForm'
import EditTaskForm from './EditTaskForm'
import { checkInputValidity } from '../../utils/validation'

class TaskForm extends Component {
  state = {
    taskForm: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Ваше имя',
          name: 'username'
        },
        label: 'Имя',
        value: '',
        validation: {
          // required: true,
          // minLength: 3
        },
        mode: {
          create: true,
          edit: false
        },
        validationErrors: [],
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Ваш email',
          name: 'email'
        },
        label: 'Email',
        value: '',
        validation: {
          required: true,
          email: true
        },
        mode: {
          create: true,
          edit: false
        },
        validationErrors: [],
        touched: false
      },
      text: {
        elementType: 'textarea',
        elementConfig: {
          placeholder: 'Введите текст задания',
          name: 'text'
        },
        label: 'Текст задания',
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 150
        },
        mode: {
          create: true,
          edit: true
        },
        validationErrors: [],
        touched: false
      },
      status: {
        elementType: 'radio',
        elementConfig: {
          options: [
            { value: '0', displayValue: 'Не выполнено' },
            { value: '10', displayValue: 'Выполнено' }
          ],
          name: 'status'
        },
        label: 'Статус',
        value: '0',
        mode: {
          create: false,
          edit: true
        }
      }
    }
  }

  setForm = task => {
    const taskForm = Object.keys(this.state.taskForm).reduce((acc, element) => {
      acc[element] = { ...this.state.taskForm[element] }
      acc[element].value = `${task[element]}`
      if (typeof acc[element].touched !== 'undefined') acc[element].touched = true
      return acc
    }, {})
    this.setState({ taskForm })
  }

  inputChangedHandler = event => {
    const taskForm = { ...this.state.taskForm }
    const elementForm = { ...taskForm[event.currentTarget.name] }
    elementForm.value = event.currentTarget.value
    elementForm.validationErrors = checkInputValidity(elementForm.value, elementForm.validation)
    if (elementForm.touched === false) elementForm.touched = true
    taskForm[event.currentTarget.name] = elementForm
    this.setState({ taskForm })
  }

  resetForm = () => {
    const taskForm = Object.keys(this.state.taskForm).reduce((acc, element) => {
      acc[element] = { ...this.state.taskForm[element] }
      acc[element].value = ''
      return acc
    }, {})
    this.setState({ taskForm })
  }

  render() {
    const { mode } = this.props
    const { taskForm } = this.state
    const form = Object.keys(taskForm).reduce((acc, key) => {
      if (mode === 'create') {
        if (taskForm[key].mode[mode]) acc[key] = taskForm[key]
      } else {
        acc[key] = taskForm[key]
        if (!taskForm[key].mode[mode]) acc[key].elementConfig.disabled = true
      }
      return acc
    }, {})

    return (
      <Form>
        {mode === 'create' ? (
          <CreateTaskForm
            form={form}
            onChangeHandler={this.inputChangedHandler}
            resetForm={this.resetForm}
          />
        ) : (
          <EditTaskForm
            form={form}
            onChangeHandler={this.inputChangedHandler}
            setForm={this.setForm}
            resetForm={this.resetForm}
          />
        )}
      </Form>
    )
  }
}

TaskForm.propTypes = {
  mode: PropTypes.string.isRequired
}

export default TaskForm
