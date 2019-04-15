import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Input from '../ui/Input'
import ActionButtonsBar from './ActionButtonsBar'
import Button from '../ui/Button'
import { checkFormValidity } from '../../utils/validation'
import { addTask, closeModal } from '../../actions'

class CreateTaskForm extends Component {
  closeFormHandler = event => {
    event.preventDefault()
    const { resetForm, closeModal } = this.props
    resetForm()
    closeModal()
  }

  taskCreateHandler = event => {
    event.preventDefault()
    const { form, addTask, resetForm } = this.props
    const taskFormData = Object.keys(form).reduce((acc, key) => {
      acc[key] = form[key].value
      return acc
    }, {})
    console.log(taskFormData)
    addTask(taskFormData)
    resetForm()
    this.closeFormHandler()
  }

  render() {
    const { form, onChangeHandler } = this.props
    const formElements = Object.keys(form).map(key => ({
      id: key,
      config: form[key]
    }))

    return (
      <Fragment>
        {formElements.map(element => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            validationErrors={
              element.config.validationErrors ? element.config.validationErrors : []
            }
            touched={element.config.touched ? element.config.touched : false}
            onChangeHandler={onChangeHandler}
          />
        ))}
        <ActionButtonsBar>
          <Button
            btnType="action"
            disabled={!checkFormValidity(form)}
            onClickHandler={this.taskCreateHandler}
          >
            Создать
          </Button>
          <Button btnType="danger" onClickHandler={this.closeFormHandler}>
            Отменить
          </Button>
        </ActionButtonsBar>
      </Fragment>
    )
  }
}

CreateTaskForm.propTypes = {
  form: PropTypes.object.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default connect(
  null,
  { addTask, closeModal }
)(CreateTaskForm)
