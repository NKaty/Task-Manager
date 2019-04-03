import React from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'

const sortByOptions = [
  { value: 'username', displayValue: 'имени пользователя' },
  { value: 'email', displayValue: 'email' },
  { value: 'status', displayValue: 'статусу' },
  { value: 'none', displayValue: 'none' }
]
const sortOrderOptions = [
  { value: 'asc', displayValue: 'возрастания' },
  { value: 'desc', displayValue: 'убывания' },
  { value: 'none', displayValue: 'none' }
]

const SortMenu = ({ sortBy, sortOrder, onClickSort, onSortChange, onClickResetSort }) => {
  return (
    <div>
      <Button
        btnType="action"
        onClickHandler={onClickSort}
        disabled={sortBy === 'none' || sortOrder === 'none'}
      >
        Сортировать
      </Button>
      <Input
        elementType="select"
        label="по"
        value={sortBy}
        elementConfig={{ name: 'sortBy', options: sortByOptions }}
        onChangeHandler={onSortChange}
      />
      <Input
        elementType="select"
        label="в порядке"
        value={sortOrder}
        elementConfig={{ name: 'sortOrder', options: sortOrderOptions }}
        onChangeHandler={onSortChange}
      />
      <Button btnType="action" onClickHandler={onClickResetSort} disabled={false}>
        Убрать сортировку
      </Button>
    </div>
  )
}

export default SortMenu
