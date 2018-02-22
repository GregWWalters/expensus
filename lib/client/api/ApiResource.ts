import { Dispatch } from 'redux'
import { ClientApiErrorResponse } from '../../types/api'
import State from '../../types/state'
import { selectApiToken } from '../state/selectors/auth'
import { isAxiosError } from '../utils/axiosUtils'
import req from './req'

interface Headers {
  [header: string]: string
}

export class ApiResource {
  protected readonly req = req
  private readonly apiToken: string

  constructor(
    protected readonly state: State,
    protected readonly dispatch: Dispatch<State>
  ) {
    this.apiToken = selectApiToken(state)
  }

  protected handleError(err): ClientApiErrorResponse {
    if (!isAxiosError(err) || !err.response) {
      throw new Error(`Unknown error from API: ${err}`)
    }

    if (err.response.status === 401) {
      return { err: { message: err.message, type: 'unauthorized' } }
    } else if (err.response.status >= 500) {
      return { err: { message: err.message, type: 'server_error' } }
    } else {
      return { err: { message: err.message, type: 'client_error' } }
    }
  }

  protected get defaultHeaders() {
    const headers: Headers = { 'Content-Type': 'application/json' }
    if (this.apiToken) {
      headers.Authorization = `Bearer ${this.apiToken}`
    }
    return headers
  }
}
