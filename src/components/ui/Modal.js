import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TaskForm from '../taskForm/TaskForm'
import Backdrop from './Backdrop'
import { isModalOpenSelector, componentIdSelector, componentModeSelector } from '../../selectors'
import { closeModal } from '../../actions'
import styled from 'styled-components'

const types = { TaskForm }

const StyledModal = styled.div`
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 70%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 3px #333;
  padding: 1rem;
  left: 15%;
  top: 20%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-100vh)')};
  opacity: ${({ open }) => (open ? '1' : '0')};

  @media (min-width: 600px) {
    width: 500px;
    left: calc(50% - 250px);
  }
`

class Modal extends Component {
  closeModal = event => {
    event.preventDefault()
    this.props.closeModal()
  }

  render() {
    console.log('render')
    const { open, componentId, mode } = this.props
    const Form = types[componentId]
    console.log(mode)

    return (
      open && (
        <Fragment>
          <Backdrop removeBackdrop={this.closeModal} />
          <StyledModal open={open}>
            <Form mode={mode} />
          </StyledModal>
        </Fragment>
      )
    )
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  componentId: PropTypes.string,
  mode: PropTypes.string
}

StyledModal.propTypes = {
  open: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    open: isModalOpenSelector(state),
    componentId: componentIdSelector(state),
    mode: componentModeSelector(state)
  }
}

export default connect(
  mapStateToProps,
  { closeModal }
)(Modal)
