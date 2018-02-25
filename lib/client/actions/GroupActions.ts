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
export const fetchingGroup = createAction('FETCHING_GROUP')
export const fetchGroupError = createAction<ClientApiError>('FETCH_GROUP_ERROR')

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

  dispatch(fetchingGroup())
  const groupApi = new GroupResource(getState(), dispatch)
  const resp = await groupApi.fetchGroup()

  if ('err' in resp) {
    dispatch(fetchGroupError(resp.err))
    return
  }

  dispatch(setGroup(resp.group))
}
