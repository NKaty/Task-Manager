import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ActionButtonsBar from '../form/ActionButtonsBar'
import Button from '../ui/Button'
import Form from '../form/Form'
import FormHeader from '../form/FormHeader'
import FormField from '../ui/FormField'
import withForm from '../../hoc/withForm'
import { loginAsAdmin, closeModal } from '../../actions'
import { checkFormValidity } from '../../utils/validation'

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

  formFieldChangedHandler = event => {
    const changedForm = this.props.getChangedForm(this.state.loginForm, event)
    this.setState({ loginForm: changedForm })
  }

  resetForm = () => {
    const changedForm = this.props.getResetForm(this.state.loginForm)
    this.setState({ loginForm: changedForm })
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
            onChangeHandler={this.formFieldChangedHandler}
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
  closeModal: PropTypes.func.isRequired,
  getChangedForm: PropTypes.func.isRequired,
  getResetForm: PropTypes.func.isRequired
}

export default connect(
  null,
  { loginAsAdmin, closeModal }
)(withForm(LoginForm))
