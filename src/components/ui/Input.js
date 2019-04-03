import React, { Fragment } from 'react'

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
        <label>
          {label}
          <input
            className={`${invalid && touched ? ' isInvalid' : ''}`}
            {...elementConfig}
            value={value}
            onChange={onChangeHandler}
          />
        </label>
      )
      break
    case 'textarea':
      inputElement = (
        <label>
          {label}
          <textarea
            className={`${invalid && touched ? ' isInvalid' : ''}`}
            {...elementConfig}
            value={value}
            onChange={onChangeHandler}
          />
        </label>
      )
      break
    case 'select':
      inputElement = (
        <label>
          {label}
          <select name={elementConfig.name} value={value} onChange={onChangeHandler}>
            {elementConfig.options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.displayValue}
              </option>
            ))}
          </select>
        </label>
      )
      break

    default:
      inputElement = (
        <label>
          {label}
          <input
            className={`${invalid && touched ? ' isInvalid' : ''}`}
            {...elementConfig}
            value={value}
            onChange={onChangeHandler}
          />
        </label>
      )
  }

  return (
    <Fragment>
      {invalid && validationErrors.map(error => <p key={error}>{error}</p>)}
      {inputElement}
    </Fragment>
  )
}

export default Input
