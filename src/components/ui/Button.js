import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  display: inline-block;
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

const FilledStyledButton = styled(StyledButton)`
  color: #fff;
  background-color: ${({ btnType }) =>
    (btnType === 'action' && '#0dc69e') || (btnType === 'danger' && '#db7093') || '#0b9fe5'};

  :not([disabled]):hover {
    background-color: ${({ btnType }) =>
      (btnType === 'action' && '#01a582') || (btnType === 'danger' && '#d65781') || '#017fba'};
    border: ${({ btnType }) =>
      (btnType === 'action' && '2px solid #01a582') ||
      (btnType === 'danger' && '2px solid #d65781') ||
      '2px solid #017fba'};
  }
`

const Button = ({ children, onClickHandler, btnType, fill, disabled }) => (
  <StyledButton
    as={fill && FilledStyledButton}
    btnType={btnType}
    onClick={onClickHandler}
    disabled={disabled}
  >
    {children}
  </StyledButton>
)

Button.defaultProps = {
  disabled: false
}

export default Button
