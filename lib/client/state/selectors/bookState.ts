import { createSelector } from 'reselect'
import State from '../../../types/state'

export const selectBookState = (state: State) => state.bookState

export const selectLoadBooksState = createSelector(
  selectBookState,
  bookState => bookState.loadBooks
)

export const selectSubmitBookState = createSelector(
  selectBookState,
  bookState => bookState.submitBook
)

export const selectSubmitBookStatus = createSelector(
  selectSubmitBookState,
  submitBookState => submitBookState.status
)

export const selectSubmitBookError = createSelector(
  selectSubmitBookState,
  submitBookState => submitBookState.error
)

export const selectBooks = createSelector(
  selectBookState,
  bookState => bookState.books
)
