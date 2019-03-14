import React from 'react'

const Button = ({ children, onClickHandler, btnType, disabled }) => (
  <button className={`button button--${btnType}`} onClick={onClickHandler} disabled={disabled}>
    {children}
  </button>
)

export default Button
