import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { RequestState } from '../../../types'
import UserState from '../../../types/state/user'
import { loadUser, loadUserError, setUser } from '../../actions/UserActions'
import { userState } from '../defaultState'

// === Combined UserState reducer
const userReducer = createReducer<UserState['user']>({}, null)
const loadUserReducer = createReducer<UserState['loadUser']>(
  {},
  userState.loadUser
)
const userStateReducer = combineReducers({
  loadUser: loadUserReducer,
  user: userReducer,
})
export default userStateReducer

// === User Reducer Handlers
userReducer.on(setUser, (state, user) => user)

// === User Status Reducer Handlers
loadUserReducer.on(setUser, (state, user) => ({
  error: null,
  status: RequestState.COMPLETED,
}))

loadUserReducer.on(loadUser, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

loadUserReducer.on(loadUserError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))
