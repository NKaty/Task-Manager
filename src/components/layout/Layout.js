import React from 'react'
import styled from 'styled-components'

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 980px;
  margin: 0 1.5rem;

  @media (min-width: 500px) {
    align-items: flex-start;
    margin: 0 auto;
  }
`

const Layout = ({ children }) => <StyledLayout>{children}</StyledLayout>

export default Layout
