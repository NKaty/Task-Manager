import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '../ui/Button'
import Loader from '../ui/Loader'
import { loginLoadingSelector } from '../../selectors'
import { openModal } from '../../actions'

const Login = ({ loading, openModal }) => {
  const onClickLoginHandler = event => {
    event.preventDefault()
    openModal('LoginForm', null)
  }
  return (
    <Fragment>
      {loading && <Loader />}
      <Button onClickHandler={onClickLoginHandler}>Войти как администратор</Button>
    </Fragment>
  )
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    loading: loginLoadingSelector(state)
  }
}

export default connect(
  mapStateToProps,
  { openModal }
)(Login)
