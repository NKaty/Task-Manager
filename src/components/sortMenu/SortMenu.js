import React from 'react'
import Select from '../ui/Select'
import Button from '../ui/Button'
import styled from 'styled-components'

const sortByOptions = [
  { value: 'username', displayValue: 'имени пользователя' },
  { value: 'email', displayValue: 'email' },
  { value: 'status', displayValue: 'статусу' },
  { value: 'none', displayValue: 'по...' }
]
const sortOrderOptions = [
  { value: 'asc', displayValue: 'возрастания' },
  { value: 'desc', displayValue: 'убывания' },
  { value: 'none', displayValue: 'в порядке...' }
]

const StyledSortMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const SortMenu = ({ sortBy, sortOrder, onClickSort, onSortChange, onClickResetSort }) => {
  return (
    <StyledSortMenu>
      <Button onClickHandler={onClickSort} disabled={sortBy === 'none' || sortOrder === 'none'}>
        Сортировать
      </Button>
      <Select value={sortBy} name="sortBy" options={sortByOptions} onChangeHandler={onSortChange} />
      <Select
        value={sortOrder}
        name="sortOrder"
        options={sortOrderOptions}
        onChangeHandler={onSortChange}
      />
      <Button btnType="danger" onClickHandler={onClickResetSort} disabled={false}>
        Убрать сортировку
      </Button>
    </StyledSortMenu>
  )
}

export default SortMenu
