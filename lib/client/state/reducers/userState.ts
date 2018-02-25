import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import UserState from '../../../types/state/user'
import {
  fetchingUser,
  fetchUserError,
  setUser,
} from '../../actions/UserActions'

// === Combined UserState reducer
const userReducer = createReducer<UserState['user']>({}, null)
const userStatusReducer = createReducer<UserState['status']>({}, 'not loaded')
const userStateReducer = combineReducers({
  status: userStatusReducer,
  user: userReducer,
})
export default userStateReducer

// === User Reducer Handlers
userReducer.on(setUser, (state, user) => user)

// === User Status Reducer Handlers
userStatusReducer.on(setUser, (state, user) => 'loaded')
userStatusReducer.on(fetchingUser, state => 'loading')
userStatusReducer.on(fetchUserError, state => 'error')
