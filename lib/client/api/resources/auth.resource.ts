import {
  LoginParams,
  LoginResponseBody,
  SignupParams,
  SignupResponseBody,
} from '../../../types/api/auth'
import { ApiResource } from '../ApiResource'

export default class AuthResource extends ApiResource {
  async login(params: LoginParams) {
    try {
      const resp = await this.req.post<LoginResponseBody>(
        '/auth/login',
        params,
        {
          headers: this.defaultHeaders,
        }
      )
      return resp.data
    } catch (err) {
      return this.handleError(err)
    }
  }

  async signup(params: SignupParams) {
    try {
      const resp = await this.req.post<SignupResponseBody>(
        '/auth/signup',
        params
      )
      return resp.data
    } catch (err) {
      return this.handleError(err)
    }
  }
}
