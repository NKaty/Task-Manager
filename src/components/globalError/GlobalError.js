import React from 'react'
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

const GlobalError = ({ error, resetErrorMessage }) => {
  const handleDismissClick = event => {
    event.preventDefault()
    resetErrorMessage()
  }

  const getErrorMessages = () => {
    const { errors } = error

    return typeof errors === 'object' ? (
      <ul>
        {Object.keys(errors).map(err => (
          <li key={err}>
            {err}: {errors[err]}
          </li>
        ))}
      </ul>
    ) : (
      <p>{errorMessages[errors] || errors}</p>
    )
  }

  return (
    error && (
      <ErrorMessageWrapper>
        <Layout>
          <ErrorMessage>
            <ErrorInfo direction="column">
              {error.title && <p>{error.title}</p>}
              {error.errors && getErrorMessages()}
            </ErrorInfo>
            <CardMenu>
              <Button btnType="danger" fill={true} onClickHandler={handleDismissClick}>
                Закрыть
              </Button>
            </CardMenu>
          </ErrorMessage>
        </Layout>
      </ErrorMessageWrapper>
    )
  )
}

GlobalError.propTypes = {
  error: typeErrorObject,
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
