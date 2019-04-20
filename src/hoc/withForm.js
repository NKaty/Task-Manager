import React from 'react'
import { checkInputValidity } from '../utils/validation'

export default OriginalComponent => {
  return function WithForm(props) {
    const getChangedForm = (originalForm, event) => {
      const form = { ...originalForm }
      const elementForm = { ...form[event.currentTarget.name] }
      elementForm.value = event.currentTarget.value
      elementForm.validationErrors = checkInputValidity(elementForm.value, elementForm.validation)
      if (elementForm.touched === false) elementForm.touched = true
      form[event.currentTarget.name] = elementForm
      return form
    }

    const getResetForm = originalForm => {
      const form = Object.keys(originalForm).reduce((acc, element) => {
        acc[element] = { ...originalForm[element] }
        acc[element].value = ''
        return acc
      }, {})
      return form
    }

    const getSetForm = (originalForm, task) => {
      const form = Object.keys(originalForm).reduce((acc, element) => {
        acc[element] = { ...originalForm[element] }
        acc[element].value = `${task[element]}`
        if (typeof acc[element].touched !== 'undefined') acc[element].touched = true
        return acc
      }, {})
      return form
    }

    return (
      <OriginalComponent
        {...props}
        getChangedForm={getChangedForm}
        getResetForm={getResetForm}
        getSetForm={getSetForm}
      />
    )
  }
}
