import React from 'react'

const Select = ({ label, name, value, onChangeHandler, options }) => {
  return (
    <label>
      {label}
      <select name={name} value={value} onChange={onChangeHandler}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.displayValue}
          </option>
        ))}
      </select>
    </label>
  )
}

export default Select
