import React, { Fragment } from 'react'
import Backdrop from './Backdrop'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledLoader = styled.div`
  position: relative;
  z-index: 500;
  text-indent: -9999em;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: #1b2239;
  background: linear-gradient(to right, #1b2239 10%, rgba(27, 34, 57, 0) 42%);
  animation: ${spin} 1.4s infinite linear;
  transform: translateZ(0);

  :before {
    width: 50%;
    height: 50%;
    background: #1b2239;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  :after {
    background: #fff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`

const Loader = () => {
  return (
    <Fragment>
      <Backdrop removeBackdrop={null} />
      <LoaderWrapper>
        <StyledLoader />
      </LoaderWrapper>
    </Fragment>
  )
}

export default Loader
