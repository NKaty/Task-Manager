import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Layout from '../layout/Layout'
import Button from '../ui/Button'
import Card from '../card/Card'
import CardInfo from '../card/CardInfo'
import CardMenu from '../card/CardMenu'
import { errorSelector } from '../../selectors'
import { resetErrorMessage } from '../../actions'
import { errorMessages } from './errorDictionary'
import { typeErrorObject } from '../../types'
import styled from 'styled-components'

const ErrorMessageWrapper = styled.div`
  background-color: #fad2d6;
`

const ErrorMessage = styled(Card)`
  color: #7b0a1c;
`

const ErrorInfo = styled(CardInfo)`
  > * {
    :first-child {
      font-size: 1.3rem;
    }
  }

  p {
    margin: 0.2rem 0 0.2rem 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0.2rem 0 0.2rem 0.5rem;
  }
`

class GlobalError extends Component {
  handleDismissClick = ev => {
    ev.preventDefault()
    this.props.resetErrorMessage()
  }

  get errorMessages() {
    const {
      error: { errors }
    } = this.props
    console.log(errorMessages[errors])

    return typeof errors === 'object' ? (
      <ul>
        {Object.keys(errors).map(error => (
          <li key={error}>
            {error}: {errors[error]}
          </li>
        ))}
      </ul>
    ) : (
      <p>{errorMessages[errors] || errors}</p>
    )
  }

  render() {
    const { error } = this.props
    console.log(error)

    return (
      error && (
        <ErrorMessageWrapper>
          <Layout>
            <ErrorMessage>
              <ErrorInfo direction="column">
                {error.title && <p>{error.title}</p>}
                {error.errors && this.errorMessages}
              </ErrorInfo>
              <CardMenu>
                <Button btnType="danger" fill={true} onClickHandler={this.handleDismissClick}>
                  Закрыть
                </Button>
              </CardMenu>
            </ErrorMessage>
          </Layout>
        </ErrorMessageWrapper>
      )
    )
  }
}

GlobalError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, typeErrorObject]),
  resetErrorMessage: PropTypes.func.isRequired
}

ErrorInfo.propTypes = {
  direction: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    error: errorSelector(state)
  }
}

export default connect(
  mapStateToProps,
  { resetErrorMessage }
)(GlobalError)
