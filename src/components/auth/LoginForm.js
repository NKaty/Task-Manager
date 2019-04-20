import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ActionButtonsBar from '../form/ActionButtonsBar'
import Button from '../ui/Button'
import Form from '../form/Form'
import FormHeader from '../form/FormHeader'
import FormField from '../ui/FormField'
import { loginAsAdmin, closeModal } from '../../actions'
import { checkInputValidity, checkFormValidity } from '../../utils/validation'

class LoginForm extends Component {
  state = {
    loginForm: {
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
        validationErrors: [],
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Пароль',
          name: 'password'
        },
        label: 'Password',
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        validationErrors: [],
        touched: false
      }
    }
  }

  inputChangedHandler = event => {
    const loginForm = { ...this.state.loginForm }
    const elementForm = { ...loginForm[event.currentTarget.name] }
    elementForm.value = event.currentTarget.value
    elementForm.validationErrors = checkInputValidity(elementForm.value, elementForm.validation)
    if (elementForm.touched === false) elementForm.touched = true
    loginForm[event.currentTarget.name] = elementForm
    this.setState({ loginForm })
  }

  resetForm = () => {
    const loginForm = Object.keys(this.state.loginForm).reduce((acc, element) => {
      acc[element] = { ...this.state.loginForm[element] }
      acc[element].value = ''
      return acc
    }, {})
    this.setState({ loginForm })
  }

  closeFormHandler = event => {
    event.preventDefault()
    this.props.closeModal()
  }

  loginHandler = event => {
    event.preventDefault()
    const { loginAsAdmin, closeModal } = this.props
    const { loginForm } = this.state
    loginAsAdmin(loginForm.username.value, loginForm.password.value)
    this.resetForm()
    closeModal()
  }

  render() {
    const { loginForm } = this.state
    const formElements = Object.keys(loginForm).map(key => ({
      id: key,
      config: loginForm[key]
    }))

    return (
      <Form>
        <FormHeader>Войти как администратор</FormHeader>
        {formElements.map(element => (
          <FormField
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            validationErrors={
              element.config.validationErrors ? element.config.validationErrors : []
            }
            touched={element.config.touched}
            onChangeHandler={this.inputChangedHandler}
          />
        ))}
        <ActionButtonsBar>
          <Button
            btnType="action"
            disabled={!checkFormValidity(loginForm)}
            onClickHandler={this.loginHandler}
          >
            Отправить
          </Button>
          <Button btnType="danger" onClickHandler={this.closeFormHandler}>
            Отменить
          </Button>
        </ActionButtonsBar>
      </Form>
    )
  }
}

LoginForm.propTypes = {
  loginAsAdmin: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default connect(
  null,
  { loginAsAdmin, closeModal }
)(LoginForm)
