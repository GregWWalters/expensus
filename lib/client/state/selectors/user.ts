import State from '../../../types/state'
import UserRequiredError from '../../errors/UserRequiredError'

export const selectMaybeUser = (state: State) => state.user

export const selectUser = (state: State) => {
  const user = state.user
  if (!state.user) throw new UserRequiredError()
  return user
}
