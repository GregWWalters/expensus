import React from 'react'
import { connect } from 'react-redux'
import { ApiState } from '../../../types'
import State from '../../../types/state'
import { BookForClient } from '../../../types/state/book'
import {
  selectBooks,
  selectLoadBooksState,
} from '../../state/selectors/bookState'
import { Column, HorizontalDivider } from '../shared/Layouts'
import { FlexWindowSpinner } from '../shared/Spinners'
import { BookListItem } from './ListItem'
import { BookCreateForm } from './CreateForm'

interface StateProps {
  books: ReadonlyArray<BookForClient>
  loadBooks: ApiState
}

const Books: React.SFC<StateProps> = ({ books, loadBooks }) => (
  <Column className="books" maxWidth="700px">
    <div className="books__header">Books</div>
    <div className="books__sub-header">
      Books are a way to keep your transactions separated from each other, even
      if they come from the same cards or accounts. For example, you can have
      one book for personal expenses and another for business - all while using
      the same card to rack up those miles.
    </div>
    <HorizontalDivider />
    {books.length ? (
      books.map(book => <BookListItem book={book} key={book.id} />)
    ) : (
      <FlexWindowSpinner />
    )}
    <HorizontalDivider />
    <div className="books__create-book-header">Create new book</div>
    <BookCreateForm />
  </Column>
)

const connected = connect<StateProps, never, never, State>(state => ({
  books: selectBooks(state),
  loadBooks: selectLoadBooksState(state),
}))(Books)

export { connected as Books }
