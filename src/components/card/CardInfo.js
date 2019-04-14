import styled from 'styled-components'
import PropTypes from 'prop-types'

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

CardInfo.defaultProps = {
  direction: 'row'
}

CardInfo.propTypes = {
  direction: PropTypes.string
}

export default CardInfo
