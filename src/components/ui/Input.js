import React from 'react'
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

  :disabled {
    opacity: 0.5;
  }
`

const Input = ({ elementConfig, value, onChangeHandler, touched, invalid }) => {
  return (
    <StyledInput
      invalid={invalid}
      touched={touched}
      {...elementConfig}
      value={value}
      onChange={onChangeHandler}
    />
  )
}

Input.propTypes = {
  elementConfig: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired
}

StyledInput.propTypes = {
  invalid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Input
