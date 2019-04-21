import React from 'react'
import PropTypes from 'prop-types'
import Login from '../auth/Login'
import Logout from '../auth/Logout'
import styled from 'styled-components'

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  background-color: #ecf0f1;

  @media (min-width: 551px) {
    flex-flow: row wrap;
    justify-content: space-between;
  }
`

const Logo = styled.h2`
  margin: 1rem;
  font-weight: 400;
  letter-spacing: 1px;
`

const Header = ({ isAdmin }) => {
  return (
    <StyledHeader>
      <Logo>Менеджер задач</Logo>
      {isAdmin ? <Logout /> : <Login />}
    </StyledHeader>
  )
}

Header.propTypes = {
  isAdmin: PropTypes.bool.isRequired
}

export default Header
