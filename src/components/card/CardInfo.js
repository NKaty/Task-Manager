import styled from 'styled-components'

const CardInfo = styled.div`
  flex: 1 auto;

  > * {
    :last-child {
      display: flex;
      flex-wrap: wrap;
      flex-direction: ${({ direction }) => direction};
    }
  }
`

export default CardInfo
