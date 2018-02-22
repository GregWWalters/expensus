import { createAction } from 'redux-act'
import UserState from '../../types/state/user'

export const setUser = createAction<UserState>('SET_USER')
