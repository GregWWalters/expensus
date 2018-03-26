import { createSelector } from 'reselect'
import { RequestState } from '../../../types'
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

export const selectUpdateBookState = createSelector(
  selectBookState,
  bookState => bookState.updateBook
)

export const selectUpdatingBookId = createSelector(
  selectUpdateBookState,
  updateBookState => updateBookState.id
)

export const selectUpdateBookStatus = createSelector(
  selectUpdateBookState,
  updateBookState => updateBookState.status
)

export const selectUpdateBookError = createSelector(
  selectUpdateBookState,
  updateBookState => updateBookState.error
)

export const selectIsBookUpdatingById = createSelector(
  (_, id: number) => id,
  selectUpdateBookState,
  (id, updateBookState) =>
    updateBookState.status === RequestState.REQUESTING &&
    id === updateBookState.id
)
