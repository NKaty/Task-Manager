import React from 'react'
import PropTypes from 'prop-types'
import Button from '../ui/Button'
// import styled from 'styled-components'

const Header = ({ isAdmin }) => {
  return (
    <div>
      <h2>Менеджер задач</h2>
      <Button>Войти как администратор</Button>
    </div>
  )
}

Header.propTypes = {
  isAdmin: PropTypes.bool.isRequired
}

export default Header
