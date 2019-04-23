import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTooltip = styled.div`
  position: relative;

  span {
    position: absolute;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    min-width: 10rem;
    max-width: calc(100vw - 2rem);
    width: 15rem;
    border-radius: 2px;
    background-color: #f7f4f4;
    color: #545353;
    box-shadow: 0 3px 16px rgba(black, 0.15);

    :after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border: 0.4rem solid transparent;
      border-top-color: #f7f4f4;
      left: 50%;
      z-index: -1;
      transform: translateX(-50%);
      transition: top 0.3s ease;
    }
  }

  ${props =>
    props.isVisible
      ? `span {
      transform: translateY(0) translateX(-50%);
      opacity: 1;
      visibility: visible;
      transition: transform 0.3s ease, opacity 0.3s, visibility 0.3s 0s;
      &:after {
        top: 100%;
      }
    }`
      : `span {
      transform: translateY(100%) translateX(-50%);
      opacity: 0;
      visibility: hidden;
      transition: transform 0.3s ease, opacity 0.3s, visibility 0.3s 0.3s;
      &:after {
        top: 0;
      }
  }`}
`

class Tooltip extends Component {
  state = { isVisible: false }

  componentWillUnmount() {
    clearTimeout(this.showTimer)
    clearTimeout(this.removeTimer)
  }

  onMouseEnterHandler = () => {
    const { showDelayTime, removeDelayTime } = this.props

    this.showTimer = setTimeout(() => {
      this.setState({
        isVisible: true
      })
    }, showDelayTime)

    this.removeTimer = setTimeout(() => {
      this.setState({
        isVisible: false
      })
    }, removeDelayTime)
  }

  onMouseLeaveHandler = () => {
    clearTimeout(this.showTimer)
    clearTimeout(this.removeTimer)
    this.setState({
      isVisible: false
    })
  }

  render() {
    const { isOn, label, children } = this.props

    return isOn ? (
      <StyledTooltip
        isVisible={this.state.isVisible}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        <span>{label}</span>
        {children}
      </StyledTooltip>
    ) : (
      children
    )
  }
}

Tooltip.defaultProps = {
  showDelayTime: 800,
  removeDelayTime: 3500,
  isOn: true
}

Tooltip.propTypes = {
  showDelayTime: PropTypes.number,
  removeDelayTime: PropTypes.number,
  isOn: PropTypes.bool,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Tooltip
