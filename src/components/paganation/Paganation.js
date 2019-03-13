import React from 'react'
import { Link } from 'react-router-dom'
import { Range } from 'immutable'

const Pagination = ({ totalRecords, page, limit, pageNeighbours }) => {
  const LEFT_ARROW = 'LEFT_ARROW'
  const RIGHT_ARROW = 'RIGHT_ARROW'
  const totalPages = Math.ceil(totalRecords / limit)

  const getPaginationItems = () => {
    const arrowBlockLength = pageNeighbours * 2 + 3
    const paginationLength = arrowBlockLength + 2

    if (paginationLength >= totalPages) return Range(1, totalPages + 1)

    const startPage = Math.max(2, page - pageNeighbours)
    const endPage = Math.min(totalPages - 1, page + pageNeighbours)
    let pages = [...Range(startPage, endPage + 1)]
    const neededToFill = arrowBlockLength - pages.length - 1

    if (startPage > 2 && totalPages - endPage > 1) {
      pages = [LEFT_ARROW, ...pages, RIGHT_ARROW]
    } else if (startPage > 2) {
      pages = [LEFT_ARROW, ...Range(startPage - neededToFill, startPage), ...pages]
    } else {
      pages = [...pages, ...Range(endPage + 1, endPage + neededToFill + 1), RIGHT_ARROW]
    }

    return [1, ...pages, totalPages]
  }

  return (
    totalRecords &&
    totalPages !== 1 && (
      <ul>
        {getPaginationItems().map(item => {
          if (item === LEFT_ARROW) {
            return (
              <li key={item}>
                <Link to={`/${page - pageNeighbours * 2 - 1}`}>&laquo;</Link>
              </li>
            )
          }

          if (item === RIGHT_ARROW) {
            return (
              <li key={item}>
                <Link to={`/${page + pageNeighbours * 2 + 1}`}>&raquo;</Link>
              </li>
            )
          }

          if (item === page) {
            return <li key={item}>{item}</li>
          }

          return (
            <li key={item}>
              <Link to={`/${item}`}>{item}</Link>
            </li>
          )
        })}
      </ul>
    )
  )
}

export default Pagination
