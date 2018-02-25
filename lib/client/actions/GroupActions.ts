import { createAction } from 'redux-act'
import { GroupForClient } from '../../types/state/group'

// === Basic Actions
export const setGroup = createAction<GroupForClient>('SET_GROUP')
export const fetchingGroup = createAction('FETCHING_GROUP')
export const fetchGroupError = createAction('FETCH_GROUP_ERROR')
