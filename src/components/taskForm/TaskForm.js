import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from '../form/Form'
import CreateTaskForm from './CreateTaskForm'
import EditTaskForm from './EditTaskForm'
import withForm from '../../hoc/withForm'

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
          required: true,
          minLength: 3
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
    const changedForm = this.props.getSetForm(this.state.taskForm, task)
    this.setState({ taskForm: changedForm })
  }

  formFieldChangedHandler = event => {
    const changedForm = this.props.getChangedForm(this.state.taskForm, event)
    this.setState({ taskForm: changedForm })
  }

  resetForm = () => {
    const changedForm = this.props.getResetForm(this.state.taskForm)
    this.setState({ taskForm: changedForm })
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
            onChangeHandler={this.formFieldChangedHandler}
            resetForm={this.resetForm}
          />
        ) : (
          <EditTaskForm
            form={form}
            onChangeHandler={this.formFieldChangedHandler}
            setForm={this.setForm}
            resetForm={this.resetForm}
          />
        )}
      </Form>
    )
  }
}

TaskForm.propTypes = {
  mode: PropTypes.string.isRequired,
  getChangedForm: PropTypes.func.isRequired,
  getResetForm: PropTypes.func.isRequired,
  getSetForm: PropTypes.func.isRequired
}

export default withForm(TaskForm)
