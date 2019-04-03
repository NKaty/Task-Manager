import React, { Fragment, Component } from 'react'
import Backdrop from './Backdrop'
import styled from 'styled-components'

const StyledModal = styled.div`
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 70%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  transform: ${props => (props.show ? 'translateY(0)' : 'translateY(-100vh)')};
  opacity: ${props => (props.show ? '1' : 0)};

  @media (min-width: 600px) {
    width: 500px;
    left: calc(50% - 250px);
  }
`

class Modal extends Component {
  // not PureComponent, because we know other prop (modalCancel) does not change
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.show !== nextProps.show || this.props.children !== nextProps.children
  // }

  render() {
    console.log('render')
    const { children, show, modalCancel } = this.props
    return (
      <Fragment>
        {show && <Backdrop removeBackdrop={modalCancel} />}
        <StyledModal show={show}>{children}</StyledModal>
      </Fragment>
    )
  }
}

export default Modal
