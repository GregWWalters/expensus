import { combineReducers } from 'redux'
import State from '../../../types/state/index'
import auth from './auth'
import groupState from './groupState'
import itemState from './itemState'
import userState from './userState'

export default combineReducers<State>({
  auth,
  userState,
  groupState,
  itemState,
})
