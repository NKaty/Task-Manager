import React from 'react'
import styled from 'styled-components'

const StyledNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 5rem;
    margin: 2rem 0;
  }

  p {
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  @media (min-width: 400px) {
    p {
      font-size: 2rem;
    }
  }

  @media (min-width: 600px) {
    h3 {
      font-size: 7rem;
      margin: 4rem 0;
    }

    p {
      font-size: 3rem;
      margin: 2rem 0;
    }
  }
`

const NotFound = () => {
  return (
    <StyledNotFound>
      <h3>404</h3>
      <p>Страница не найдена</p>
    </StyledNotFound>
  )
}

export default NotFound
