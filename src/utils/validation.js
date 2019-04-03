export function checkInputValidity(value, rules = {}) {
  const errors = []

  if (rules.required) {
    if (value.trim() === '') errors.push('Поле обязательно для заполнения.')
  }

  if (rules.minLength) {
    if (value.trim().length < rules.minLength)
      errors.push(`Минимальная длина поля ${rules.minLength} символа.`)
  }

  if (rules.maxLength) {
    if (value.trim().length > rules.maxLength)
      errors.push(`Максимальная длина поля ${rules.maxLength} символа.`)
  }

  if (rules.email) {
    const pattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
    if (!pattern.test(value)) errors.push('Не правильный формат email.')
  }

  return errors
}

export function checkFormValidity(form) {
  return Object.keys(form).every(
    key =>
      form[key].touched !== false &&
      (typeof form[key].validationErrors === 'undefined' || !form[key].validationErrors.length)
  )
}
