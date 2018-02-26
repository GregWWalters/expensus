import { ClientApiError } from './api'

export type Nullable<T> = T | null | undefined

export enum RequestState {
  NOT_REQUESTED,
  REQUESTING,
  COMPLETED,
  ERROR,
}

export interface ApiState {
  status: RequestState
  error: ClientApiError | null
}
