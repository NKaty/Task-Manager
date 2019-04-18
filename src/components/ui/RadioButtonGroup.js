import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledRadioButtonGroup = styled.p`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  [type='radio'] {
    position: absolute;
    left: -9999px;
  }

  [type='radio'] + label {
    position: relative;
    padding-left: 2rem;
    margin: 0.2rem 1rem;
    cursor: pointer;
    line-height: 1.5rem;
    color: #666;
  }

  [type='radio'] + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 1.3rem;
    height: 1.3rem;
    border: 0.05rem solid #ddd;
    border-radius: 100%;
    background: #fff;
  }

  [type='radio'] + label:after {
    content: '';
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: 0.9rem;
    height: 0.9rem;
    background: #0b9fe5;
    border-radius: 100%;
    transition: all 0.2s ease;
  }

  [type='radio']:not(:checked) + label:after {
    opacity: 0;
    transform: scale(0);
  }

  [type='radio']:checked + label:after {
    opacity: 1;
    transform: scale(1);
  }
`

const RadioButtonGroup = ({ elementConfig, value, onChangeHandler }) => {
  return (
    <StyledRadioButtonGroup>
      {elementConfig.options.map(item => (
        <Fragment key={item.value}>
          <input
            type="radio"
            name={elementConfig.name}
            value={item.value}
            id={item.value}
            checked={value === item.value}
            onChange={onChangeHandler}
          />
          <label htmlFor={item.value}>{item.displayValue}</label>
        </Fragment>
      ))}
    </StyledRadioButtonGroup>
  )
}

RadioButtonGroup.propTypes = {
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired
}

export default RadioButtonGroup
