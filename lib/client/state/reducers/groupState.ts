import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import GroupState from '../../../types/state/group'
import {
  fetchingGroup,
  fetchGroupError,
  setGroup,
} from '../../actions/GroupActions'

// === Combined GroupState reducer
const groupReducer = createReducer<GroupState['group']>({}, null)
const groupStatusReducer = createReducer<GroupState['status']>({}, 'not loaded')
const groupStateReducer = combineReducers({
  status: groupStatusReducer,
  group: groupReducer,
})
export default groupStateReducer

// === User Reducer Handlers
groupReducer.on(setGroup, (state, group) => group)

// === User Status Reducer Handlers
groupStatusReducer.on(setGroup, (state, group) => 'loaded')
groupStatusReducer.on(fetchingGroup, state => 'loading')
groupStatusReducer.on(fetchGroupError, state => 'error')
