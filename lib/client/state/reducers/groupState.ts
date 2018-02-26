import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { RequestState } from '../../../types'
import GroupState from '../../../types/state/group'
import {
  loadGroup,
  loadGroupError,
  setGroup,
  submittedGroup,
  submitGroup,
  submitGroupError,
} from '../../actions/GroupActions'
import { groupState } from '../defaultState'

// === Combined GroupState reducer
const groupReducer = createReducer<GroupState['group']>({}, groupState.group)
const loadGroupReducer = createReducer<GroupState['loadGroup']>(
  {},
  groupState.loadGroup
)
const submitGroupReducer = createReducer<GroupState['submitGroup']>(
  {},
  groupState.loadGroup
)

const groupStateReducer = combineReducers({
  group: groupReducer,
  loadGroup: loadGroupReducer,
  submitGroup: submitGroupReducer,
})
export default groupStateReducer

// === Group Reducer Handlers
groupReducer.on(setGroup, (state, group) => group)

// === LoadGroup State Reducer Handlers
loadGroupReducer.on(setGroup, (state, group) => ({
  error: null,
  status: RequestState.COMPLETED,
}))

loadGroupReducer.on(loadGroup, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

loadGroupReducer.on(loadGroupError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))

// === SubmitGroup State Reducer Handlers
submitGroupReducer.on(setGroup, (state, group) => ({
  error: null,
  status: RequestState.COMPLETED,
}))

submitGroupReducer.on(submitGroup, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

submitGroupReducer.on(submittedGroup, state => ({
  error: null,
  status: RequestState.COMPLETED,
}))

submitGroupReducer.on(submitGroupError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))
