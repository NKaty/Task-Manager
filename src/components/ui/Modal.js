import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TaskForm from '../taskForm/TaskForm'
import LoginForm from '../auth/LoginForm'
import Backdrop from './Backdrop'
import { isModalOpenSelector, componentIdSelector, componentModeSelector } from '../../selectors'
import { closeModal, cancelEditMode, resetErrorMessage } from '../../actions'
import styled from 'styled-components'

const types = { TaskForm, LoginForm }

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
  componentDidUpdate() {
    console.log('modal')
    this.props.resetErrorMessage()
  }

  closeModalHandler = event => {
    event.preventDefault()
    const { cancelEditMode, closeModal, mode } = this.props
    closeModal()
    if (mode === 'edit') cancelEditMode()
  }

  render() {
    console.log('render')
    const { open, componentId, mode } = this.props
    const Form = types[componentId]

    return (
      open && (
        <Fragment>
          <Backdrop removeBackdrop={this.closeModalHandler} />
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
  mode: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  cancelEditMode: PropTypes.func.isRequired
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
  { closeModal, cancelEditMode, resetErrorMessage }
)(Modal)
