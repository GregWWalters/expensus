import { createReducer } from 'redux-act'
import AuthState from '../../../../types/state/auth'
import { setApiToken } from '../../../actions/AuthActions'

const apiTokenReducer = createReducer<AuthState['apiToken']>({}, '')
export default apiTokenReducer

apiTokenReducer.on(setApiToken, (state, apiToken) => apiToken)
