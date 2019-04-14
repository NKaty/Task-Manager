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
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  @media (min-width: 500px) {
    flex-flow: row wrap;
    padding-left: 1rem;
    padding-right: 1rem;

    > * {
      :nth-child(1) {
        order: 2;
      }
      :nth-child(2) {
        order: 3;
      }
      :nth-child(3) {
        order: 4;
      }
      :nth-child(4) {
        order: 1;
      }
    }
  }

  @media (min-width: 680px) {
    padding-left: 0;
    padding-right: 0;
    > * {
      :nth-child(1) {
        order: 1;
      }
      :nth-child(2) {
        order: 2;
      }
      :nth-child(3) {
        order: 3;
      }
      :nth-child(4) {
        order: 4;
      }
    }
  }
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
      <Button btnType="danger" onClickHandler={onClickResetSort}>
        Убрать сортировку
      </Button>
    </StyledSortMenu>
  )
}

export default SortMenu
