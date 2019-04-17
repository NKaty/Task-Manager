import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import Textarea from './Textarea'
import RadioButtonGroup from './RadioButtonGroup'
import Select from './Select'
import styled from 'styled-components'

const ErrorMessage = styled.p`
  color: #db7093;
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
`

const ErrorMessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 2rem;
`

const FormField = ({
  elementType,
  elementConfig,
  value,
  label,
  onChangeHandler,
  validationErrors,
  touched
}) => {
  let formElement = null
  const invalid = validationErrors ? !!validationErrors.length : false

  switch (elementType) {
    case 'input':
      formElement = (
        <Input
          invalid={invalid}
          touched={touched}
          elementConfig={elementConfig}
          value={value}
          onChangeHandler={onChangeHandler}
        />
      )
      break
    case 'textarea':
      formElement = (
        <Textarea
          invalid={invalid}
          touched={touched}
          elementConfig={elementConfig}
          value={value}
          onChangeHandler={onChangeHandler}
        />
      )
      break
    case 'select':
      formElement = (
        <Select
          name={elementConfig.name}
          value={value}
          onChangeHandler={onChangeHandler}
          options={elementConfig.options}
        />
      )
      break

    case 'radio':
      formElement = (
        <RadioButtonGroup
          elementConfig={elementConfig}
          value={value}
          onChangeHandler={onChangeHandler}
        />
      )
      break

    default:
      formElement = (
        <Input
          invalid={invalid}
          touched={touched}
          elementConfig={elementConfig}
          value={value}
          onChangeHandler={onChangeHandler}
        />
      )
  }

  return (
    <Fragment>
      {typeof touched !== 'undefined' && (
        <ErrorMessagesWrapper>
          {invalid &&
            validationErrors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
        </ErrorMessagesWrapper>
      )}
      {label ? (
        <label>
          {label} {formElement}
        </label>
      ) : (
        formElement
      )}
    </Fragment>
  )
}

FormField.propTypes = {
  elementType: PropTypes.string,
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  validationErrors: PropTypes.arrayOf(PropTypes.string),
  touched: PropTypes.bool
}

export default FormField
