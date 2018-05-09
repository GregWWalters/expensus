import { combineReducers } from 'redux'
import State from '../../../types/state/index'
import auth from './auth'
import bookState from './bookState'
import categoryState from './categoryState'
import groupState from './groupState'
import itemState from './itemState'
import transactionState from './transactionState'
import userState from './userState'

export default combineReducers<State>({
  auth,
  bookState,
  categoryState,
  groupState,
  itemState,
  transactionState,
  userState,
})
