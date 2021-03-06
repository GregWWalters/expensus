import { NormalizedCollection } from '../../server/utils/normalizer'
import { ApiState, ApiUpdateState, RequestState } from '../../types'
import AuthState from '../../types/state/auth'
import { BookState } from '../../types/state/book'
import { CategoryForClient, CategoryState } from '../../types/state/category'
import GroupState from '../../types/state/group'
import State from '../../types/state/index'
import ItemState from '../../types/state/item'
import TransactionState from '../../types/state/transaction'
import UserState from '../../types/state/user'

export const defaultApiState: ApiState = {
  error: null,
  status: RequestState.NOT_REQUESTED,
}

export const defaultApiUpdateState: ApiUpdateState = {
  error: null,
  status: RequestState.NOT_REQUESTED,
  id: null,
}

export const makeDefaultNormalizedState = <T>(): NormalizedCollection<T> => ({
  byId: {},
  allIds: [],
})

export const auth: AuthState = {
  apiToken: '',
  login: defaultApiState,
  signup: defaultApiState,
}

export const userState: UserState = {
  loadUser: defaultApiState,
  user: null,
}

export const groupState: GroupState = {
  group: null,
  loadGroup: defaultApiState,
  submitGroup: defaultApiState,
}

export const itemState: ItemState = {
  loadItems: defaultApiState,
  items: [],
  submitItem: defaultApiState,
}

export const transactionState: TransactionState = {
  editTransactionModalOpenFor: null,
  loadTransactions: defaultApiState,
  submitTransaction: defaultApiState,
  transactions: [],
}

export const bookState: BookState = {
  loadBooks: defaultApiState,
  submitBook: defaultApiState,
  updateBook: {
    ...defaultApiState,
    id: null,
  },
  books: [],
}

export const categoryState: CategoryState = {
  categories: makeDefaultNormalizedState<CategoryForClient>(),
  getCategories: defaultApiState,
  addCategory: defaultApiState,
  updateCategory: defaultApiUpdateState,
}

const defaultState: State = {
  auth,
  bookState,
  categoryState,
  groupState,
  itemState,
  transactionState,
  userState,
}

export default defaultState
