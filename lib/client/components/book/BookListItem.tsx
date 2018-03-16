import React from 'react'
import { BookForClient } from '../../../types/state/book'
import { Icon } from '../shared/Icon'

interface Props {
  book: BookForClient
}

const BookListItem: React.SFC<Props> = ({ book }) => (
  <div className="book-list-item">
    <div className="book-list-item__icon">
      <Icon iconName="book" />
    </div>
    <div className="book-list-item__name">{book.name}</div>
  </div>
)

export { BookListItem }
