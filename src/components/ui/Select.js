import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { typeSelectOptions } from '../../types'
import styled from 'styled-components'

const SelectWrapper = styled.div`
  display: inline-block;
  position: relative;
  min-width: 12rem;
  max-width: 12rem;
  min-height: 1.6rem;
  max-height: 1.6rem;
  margin: 1rem;
  border: 2px solid transparent;
`
const StyledSelect = styled.span`
  position: absolute;
  display: inline-block;
  min-width: 12rem;
  max-width: 12rem;
  min-height: 1.6rem;
  max-height: 1.6rem;
  overflow: hidden;
  top: -2px;
  left: -2px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  color: #0b9fe5;
  outline: none;
  border: 2px solid #0b9fe5;
  border-radius: 3px;
  background-color: #fff;
  transition: 0.3s all ease-in-out;
  ${props =>
    props.isExpanded &&
    `
  & {
    padding: 0;
    box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.1);
    max-height: 15rem;

    label {
      &:hover {
        color: #0d72a5;
      }
    }
    input:checked + label {
      color: #0d72a5;
    }

    &::after {
      transform: rotate(-180deg);
      top: 0.55rem;
    }
    `}

  input {
    display: none;
  }
  label {
    border-top: 0.06rem solid #d9d9d9;
    display: block;
    height: 1.6rem;
    line-height: 1.6rem;
    padding-left: 1rem;
    padding-right: 3rem;
    cursor: pointer;
    position: relative;
    transition: 0.3s color ease-in-out;
    &:nth-child(2) {
      margin-top: 1.6rem;
      border-top: 0.06rem solid #d9d9d9;
    }
  }
  input:checked + label {
    display: block;
    border-top: none;
    position: absolute;
    top: 0;

    &:nth-child(2) {
      margin-top: 0;
      position: relative;
    }
  }

  &::after {
    content: '';
    position: absolute;
    right: 0.8rem;
    top: 0.7rem;
    border: 0.3rem solid #0b9fe5;
    border-color: #0b9fe5 transparent transparent transparent;
    transition: 0.4s all ease-in-out;
  }
`
class Select extends Component {
  state = {
    isExpanded: false
  }

  selectRef = React.createRef()

  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside)
  }

  onToggleHandler = event => {
    event.preventDefault()
    this.setState(prev => ({ isExpanded: !prev.isExpanded }))
  }

  onClickOutside = event => {
    if (this.selectRef && this.selectRef.current.contains(event.target)) return
    if (!this.state.isExpanded) return
    this.setState({ isExpanded: false })
  }

  onChangeOptionHandler = event => {
    event.preventDefault()
    const { name, onChangeHandler } = this.props
    const value = event.target.getAttribute('for')
    onChangeHandler({ name, value })
  }

  render() {
    const { name, value, options } = this.props
    return (
      <SelectWrapper ref={this.selectRef}>
        <StyledSelect onClick={this.onToggleHandler} isExpanded={this.state.isExpanded}>
          {options.map(option => (
            <Fragment key={option.value}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                id={option.value}
                onChange={this.onChangeOptionHandler}
              />
              <label
                htmlFor={option.value}
                onClick={this.onChangeOptionHandler}
                onFocus={this.onChangeOptionHandler}
                onBlur={this.onChangeOptionHandler}
              >
                {option.displayValue}
              </label>
            </Fragment>
          ))}
        </StyledSelect>
      </SelectWrapper>
    )
  }
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(typeSelectOptions).isRequired,
  onChangeHandler: PropTypes.func.isRequired
}

StyledSelect.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Select
