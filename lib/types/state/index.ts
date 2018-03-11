import AuthState from './auth'
import GroupState from './group'
import ItemState from './item'
import TransactionState from './transaction'
import UserState from './user'

export default interface State {
  readonly auth: AuthState
  readonly groupState: GroupState
  readonly itemState: ItemState
  readonly transactionState: TransactionState
  readonly userState: UserState
}
