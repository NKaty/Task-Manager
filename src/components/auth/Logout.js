import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '../ui/Button'
import { logout } from '../../actions'

const Logout = ({ logout }) => {
  const onClickLogoutHandler = event => {
    event.preventDefault()
    logout()
  }
  return <Button onClickHandler={onClickLogoutHandler}>Выйти</Button>
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(
  null,
  { logout }
)(Logout)
