import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTextarea = styled.textarea`
  border-radius: 3px;
  border: ${({ invalid, touched }) =>
    invalid && touched ? '1px solid #db7093' : '1px solid #0b9fe5'};
  font-size: 1rem;
  display: block;
  width: 70%;
  margin: 0 0 0.6rem;
  padding: 0.5rem 1rem;
  height: 100px;
`

const Textarea = ({ elementConfig, value, onChangeHandler, touched, invalid }) => {
  return (
    <StyledTextarea
      invalid={invalid}
      touched={touched}
      {...elementConfig}
      value={value}
      onChange={onChangeHandler}
    />
  )
}

Textarea.propTypes = {
  elementConfig: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired
}

StyledTextarea.propTypes = {
  invalid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Textarea
