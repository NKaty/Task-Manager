import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledInput = styled.input`
  border-radius: 3px;
  border: ${({ invalid, touched }) =>
    invalid && touched ? '1px solid #db7093' : '1px solid #0b9fe5'};
  font-size: 1rem;
  display: block;
  width: 70%;
  margin: 0 0 0.6rem;
  padding: 0.5rem 1rem;
`
const StyledTextarea = styled(StyledInput)`
  height: 100px;
`
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

const Input = ({
  elementType,
  elementConfig,
  value,
  label,
  onChangeHandler,
  validationErrors,
  touched
}) => {
  let inputElement = null
  const invalid = validationErrors ? !!validationErrors.length : false

  switch (elementType) {
    case 'input':
      inputElement = (
        <StyledInput
          invalid={invalid}
          touched={touched}
          {...elementConfig}
          value={value}
          onChange={onChangeHandler}
        />
      )
      break
    case 'textarea':
      inputElement = (
        <StyledTextarea
          as="textarea"
          invalid={invalid}
          touched={touched}
          {...elementConfig}
          value={value}
          onChange={onChangeHandler}
        />
      )
      break
    case 'select':
      inputElement = (
        <select name={elementConfig.name} value={value} onChange={onChangeHandler}>
          {elementConfig.options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          ))}
        </select>
      )
      break

    default:
      inputElement = (
        <StyledInput
          invalid={invalid}
          touched={touched}
          {...elementConfig}
          value={value}
          onChange={onChangeHandler}
        />
      )
  }

  return (
    <Fragment>
      {touched !== undefined && (
        <ErrorMessagesWrapper>
          {invalid &&
            validationErrors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
        </ErrorMessagesWrapper>
      )}
      {label ? (
        <label>
          {label} {inputElement}
        </label>
      ) : (
        inputElement
      )}
    </Fragment>
  )
}

Input.propTypes = {
  elementType: PropTypes.string,
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  validationErrors: PropTypes.arrayOf(PropTypes.string),
  touched: PropTypes.bool
}

StyledInput.propTypes = {
  invalid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

StyledTextarea.propTypes = {
  as: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Input
