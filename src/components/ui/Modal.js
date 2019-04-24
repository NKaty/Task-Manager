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
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
  background-color: white;
  max-width: 500px;
  width: 95%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 3px #333;
  padding: 1rem;
  box-sizing: border-box;

  @media (min-width: 400px) {
    width: 90%;
  }
`

class Modal extends Component {
  componentDidUpdate() {
    this.props.resetErrorMessage()
  }

  closeModalHandler = event => {
    event.preventDefault()
    const { cancelEditMode, closeModal, mode } = this.props
    closeModal()
    if (mode === 'edit') cancelEditMode()
  }

  render() {
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
  cancelEditMode: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired
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
