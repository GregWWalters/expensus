import { createAction } from 'redux-act'
import { ThunkAction } from 'redux-thunk'
import { ClientApiError } from '../../types/api'
import State from '../../types/state'
import { GroupForClient } from '../../types/state/group'
import GroupResource from '../api/resources/group.resource'
import UserRequiredError from '../errors/UserRequiredError'
import { selectUser } from '../state/selectors/userState'

// === Basic Actions
export const setGroup = createAction<GroupForClient | null>('SET_GROUP')
export const loadGroup = createAction('LOAD_GROUP')
export const loadGroupError = createAction<ClientApiError>('LOAD_GROUP_ERROR')
export const submitGroup = createAction('SUBMIT_GROUP')
export const submittedGroup = createAction('SUBMITTED_GROUP')
export const submitGroupError = createAction<ClientApiError>(
  'SUBMIT_GROUP_ERROR'
)

export const fetchGroup = (): ThunkAction<Promise<void>, State, null> => async (
  dispatch,
  getState
) => {
  const user = selectUser(getState())
  if (!user) throw new UserRequiredError('User required to load group')
  if (!user.groupId) {
    // if user not a member of a group, set null and status will go to 'loaded'
    dispatch(setGroup(null))
    return
  }

  dispatch(loadGroup())
  const groupApi = new GroupResource(getState(), dispatch)
  const resp = await groupApi.fetchGroup()

  if ('err' in resp) {
    dispatch(loadGroupError(resp.err))
    return
  }

  dispatch(setGroup(resp.group))
}

export const submitCreateGroupRequest = (
  groupName: string
): ThunkAction<Promise<void>, State, null> => async (dispatch, getState) => {
  const user = selectUser(getState())
  if (!user) throw new UserRequiredError('User required to load group')
  // if user is a member of a group, dont let them create a new one
  // TODO: make sure this can't happen from the UI, or provide an error to user
  if (user.groupId !== null) return

  dispatch(submitGroup())
  const groupApi = new GroupResource(getState(), dispatch)
  const resp = await groupApi.createGroup(groupName)

  if ('err' in resp) {
    dispatch(submitGroupError(resp.err))
    return
  }

  dispatch(submittedGroup())
  dispatch(setGroup(resp.group))
}
