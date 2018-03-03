import { ClientApiError } from './api'

export type Nullable<T> = T | null | undefined

export enum RequestState {
  NOT_REQUESTED = 'NOT_REQUESTED',
  REQUESTING = 'REQUESTING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export interface ApiState {
  status: RequestState
  error: ClientApiError | null
}
