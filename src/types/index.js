import PropTypes from 'prop-types'

export const typeSelectOptions = PropTypes.shape({
  value: PropTypes.string.isRequired,
  displayValue: PropTypes.string.isRequired
})

export const typeErrorObject = PropTypes.shape({
  title: PropTypes.string,
  errors: PropTypes.object
})

export const typeTask = PropTypes.shape({
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
})
