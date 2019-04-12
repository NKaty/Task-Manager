import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { checkInputValidity, checkFormValidity } from '../../utils/validation'
import { addTask } from '../../actions'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

const FormHeader = styled.h2`
  font-weight: 500;
  color: #666;
  text-align: center;
  margin-bottom: 0.7rem;
`

class CreateTaskForm extends Component {
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

  taskCreateHandler = event => {
    event.preventDefault()
    const taskFormData = Object.keys(this.state.taskForm).reduce((acc, key) => {
      acc[key] = this.state.taskForm[key].value
      return acc
    }, {})
    console.log(taskFormData)
    this.props.addTask(taskFormData)
    this.props.closeFormHandler()
  }

  render() {
    const formElements = Object.keys(this.state.taskForm).map(key => ({
      id: key,
      config: this.state.taskForm[key]
    }))

    return (
      <Fragment>
        <FormHeader>Новое задание</FormHeader>
        <StyledForm>
          {formElements.map(element => (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              // label={element.config.label}
              validationErrors={
                element.config.validationErrors ? element.config.validationErrors : []
              }
              touched={element.config.touched ? element.config.touched : false}
              onChangeHandler={this.inputChangedHandler}
            />
          ))}
          <ButtonsWrapper>
            <Button
              btnType="action"
              disabled={!checkFormValidity(this.state.taskForm)}
              onClickHandler={this.taskCreateHandler}
            >
              Создать
            </Button>
            <Button btnType="danger" onClickHandler={this.props.closeFormHandler}>
              Отменить
            </Button>
          </ButtonsWrapper>
        </StyledForm>
      </Fragment>
    )
  }
}

export default connect(
  null,
  { addTask }
)(CreateTaskForm)
