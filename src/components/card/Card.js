import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;

  @media (min-width: 500px) {
    flex-wrap: nowrap;
  }
`

export default Card
