import { combineReducers } from 'redux'
import apiTokenReducer from './apiToken'
import loginReducer from './login'
import signupReducer from './signup'

const authReducer = combineReducers({
  apiToken: apiTokenReducer,
  login: loginReducer,
  signup: signupReducer,
})

export default authReducer
