import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Range } from 'immutable'
import styled from 'styled-components'

const StyledPagination = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    font-size: 1rem;
    border: 1px solid #eae5e5;
    border-left: none;
  }

  li:first-child {
    border-left: 1px solid #eae5e5;
  }

  @media (min-width: 360px) {
    li {
      font-size: 1.2rem;
    }
  }
`

const StyledLink = styled(Link)`
  display: block;
  color: #0b9fe5;
  background-color: #fff;
  padding: 0.8rem 1rem;
  text-decoration: none;

  :hover {
    color: #017fba;
    background-color: #f7f4f4;
    text-decoration: none;
  }

  :active,
  :visited {
    text-decoration: none;
  }

  @media (min-width: 360px) {
    padding: 1rem 1.2rem;
  }
`

const CurrentPage = styled.p`
  margin: 0;
  padding: 0.8rem 1rem;
  color: #017fba;
  background-color: #f7f4f4;

  @media (min-width: 360px) {
    padding: 1rem 1.2rem;
  }
`

const Pagination = ({ totalRecords, page, limit, pageNeighbours }) => {
  const LEFT_ARROW = 'LEFT_ARROW'
  const RIGHT_ARROW = 'RIGHT_ARROW'
  const totalPages = totalRecords === null ? null : Math.ceil(totalRecords / limit)

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
      <StyledPagination>
        {getPaginationItems().map(item => {
          if (item === LEFT_ARROW) {
            return (
              <li key={item}>
                <StyledLink to={`/${page - pageNeighbours * 2 - 1}`}>&laquo;</StyledLink>
              </li>
            )
          }

          if (item === RIGHT_ARROW) {
            return (
              <li key={item}>
                <StyledLink to={`/${page + pageNeighbours * 2 + 1}`}>&raquo;</StyledLink>
              </li>
            )
          }

          if (item === page) {
            return (
              <li key={item}>
                <CurrentPage>{item}</CurrentPage>
              </li>
            )
          }

          return (
            <li key={item}>
              <StyledLink to={`/${item}`}>{item}</StyledLink>
            </li>
          )
        })}
      </StyledPagination>
    )
  )
}

Pagination.defaultProps = {
  limit: 3,
  pageNeighbours: 1
}

Pagination.propTypes = {
  totalRecords: PropTypes.number,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number,
  pageNeighbours: PropTypes.number
}

StyledLink.propTypes = {
  to: PropTypes.string.isRequired
}

export default Pagination
