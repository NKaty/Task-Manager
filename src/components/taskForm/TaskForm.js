import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import CreateTaskForm from './CreateTaskForm'
import EditTaskForm from './EditTaskForm'
import { checkInputValidity } from '../../utils/validation'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormHeader = styled.h2`
  font-weight: 500;
  color: #666;
  text-align: center;
  margin-bottom: 0.7rem;
`

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
          minLength: 10,
          maxLength: 150
        },
        mode: {
          create: true,
          edit: true
        },
        validationErrors: [],
        touched: false
      }
    }
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
      if (taskForm[key].mode[mode]) acc[key] = taskForm[key]
      return acc
    }, {})

    return (
      <Fragment>
        <FormHeader>{mode === 'create' ? 'Новое задание' : 'Редактировать задание'}</FormHeader>
        <StyledForm>
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
              resetForm={this.resetForm}
            />
          )}
        </StyledForm>
      </Fragment>
    )
  }
}

TaskForm.propTypes = {
  mode: PropTypes.string.isRequired
}

export default TaskForm
