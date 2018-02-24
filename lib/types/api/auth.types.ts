import { User } from '../../server/db/entities/User'

export interface LoginParams {
  email: string
  password: string
}

export interface LoginResponseBody {
  user: Pick<User, 'email' | 'firstName' | 'lastName'>
  apiToken: string
}

export interface SignupParams {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface SignupResponseBody {
  user: Pick<User, 'email' | 'firstName' | 'lastName'>
  apiToken: string
}

export interface ApiTokenPayload {
  email: string
}
