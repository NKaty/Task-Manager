import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: ${({ btnType }) =>
    (btnType === 'action' && '#0dc69e') || (btnType === 'danger' && '#db7093') || '#0b9fe5'};
  font-size: 1rem;
  margin: 1rem;
  padding: 0.25rem 1rem;
  border: ${({ btnType }) =>
    (btnType === 'action' && '2px solid #0dc69e') ||
    (btnType === 'danger' && '2px solid #db7093') ||
    '2px solid #0b9fe5'};
  border-radius: 3px;
  cursor: pointer;

  :not([disabled]):hover {
    color: #fff;
    background-color: ${({ btnType }) =>
      (btnType === 'action' && '#0dc69e') || (btnType === 'danger' && '#db7093') || '#0b9fe5'};
  }

  :disabled {
    opacity: 0.3;
  }
`

const Button = ({ children, onClickHandler, btnType, disabled }) => (
  <StyledButton btnType={btnType} onClick={onClickHandler} disabled={disabled}>
    {children}
  </StyledButton>
)

export default Button
