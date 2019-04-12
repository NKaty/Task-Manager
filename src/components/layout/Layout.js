import React from 'react'
import styled from 'styled-components'

const StyledLayout = styled.div`
  max-width: 980px;
  margin: 0;
  padding: 1rem;

  @media (min-width: 500px) {
    align-items: flex-start;
    margin: 0 auto;
    padding: 1rem 2rem;
  }
`

const Layout = ({ children }) => <StyledLayout>{children}</StyledLayout>

export default Layout
