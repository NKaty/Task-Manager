import { formFieldsErrors } from '../components/globalError/errorDictionary'

export default errors =>
  Object.keys(errors).reduce((acc, error) => {
    formFieldsErrors[error]
      ? (acc[formFieldsErrors[error]] = errors[error])
      : (acc[error] = errors[error])
    return acc
  }, {})
