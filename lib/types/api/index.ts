export interface ClientApiError {
  message: string
  type: 'client_error' | 'server_error' | 'unauthorized'
}

export interface ClientApiErrorResponse {
  err: ClientApiError
}
