import { createReducer } from 'redux-act'
import { RequestState } from '../../../../types'
import AuthState from '../../../../types/state/auth'
import * as actions from '../../../actions/AuthActions'
import { auth as authState } from '../../defaultState'

const loginReducer = createReducer<AuthState['login']>({}, authState.login)
export default loginReducer

loginReducer.on(actions.loginSubmit, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

loginReducer.on(actions.loginSuccess, state => ({
  error: null,
  status: RequestState.COMPLETED,
}))

loginReducer.on(actions.loginError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))

loginReducer.on(actions.clearLoginState, state => authState.login)
