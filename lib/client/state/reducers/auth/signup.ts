import { createReducer } from 'redux-act'
import { RequestState } from '../../../../types'
import AuthState from '../../../../types/state/auth'
import * as actions from '../../../actions/AuthActions'
import { auth as authState } from '../../defaultState'

const signupReducer = createReducer<AuthState['signup']>({}, authState.signup)
export default signupReducer

signupReducer.on(actions.signupSubmit, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

signupReducer.on(actions.signupSuccess, state => ({
  error: null,
  status: RequestState.COMPLETED,
}))

signupReducer.on(actions.signupError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))

signupReducer.on(actions.clearSignupState, state => authState.signup)
