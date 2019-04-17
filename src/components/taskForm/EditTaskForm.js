import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Input from '../ui/Input'
import ActionButtonsBar from './ActionButtonsBar'
import Button from '../ui/Button'
import { checkFormValidity } from '../../utils/validation'
import { editingTaskSelector } from '../../selectors'
import { editTask, closeModal, cancelEditMode } from '../../actions'

class EditTaskForm extends Component {
  componentDidMount() {
    const { task, setForm } = this.props
    setForm(task)
  }

  cancelFormHandler = event => {
    event.preventDefault()
    const { closeModal, cancelEditMode } = this.props
    closeModal()
    cancelEditMode()
  }

  taskEditHandler = event => {
    event.preventDefault()
    const { form, editTask, resetForm, closeModal } = this.props
    const taskFormData = Object.keys(form).reduce((acc, key) => {
      acc[key] = form[key].value
      return acc
    }, {})
    console.log(taskFormData)
    editTask(taskFormData)
    resetForm()
    closeModal()
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
            touched={element.config.touched}
            onChangeHandler={onChangeHandler}
          />
        ))}
        <ActionButtonsBar>
          <Button
            btnType="action"
            disabled={!checkFormValidity(form)}
            onClickHandler={this.taskEditHandler}
          >
            Сохранить
          </Button>
          <Button btnType="danger" onClickHandler={this.cancelFormHandler}>
            Отменить
          </Button>
        </ActionButtonsBar>
      </Fragment>
    )
  }
}

EditTaskForm.propTypes = {
  form: PropTypes.object.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    task: editingTaskSelector(state)
  }
}

export default connect(
  mapStateToProps,
  { editTask, closeModal, cancelEditMode }
)(EditTaskForm)
