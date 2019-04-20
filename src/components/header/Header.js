import React from 'react'
import PropTypes from 'prop-types'
import Login from '../auth/Login'
import Logout from '../auth/Logout'
// import styled from 'styled-components'

const Header = ({ isAdmin }) => {
  return (
    <div>
      <h2>Менеджер задач</h2>
      {isAdmin ? <Logout /> : <Login />}
    </div>
  )
}

Header.propTypes = {
  isAdmin: PropTypes.bool.isRequired
}

export default Header
