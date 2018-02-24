import React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ClientApiError } from '../../../types/api'
import { SignupParams } from '../../../types/api/auth.types'
import State from '../../../types/state'
import { submitSignup } from '../../actions/AuthActions'
import {
  selectSignupError,
  selectSignupSubmitting,
  selectSignupSuccess,
} from '../../state/selectors/auth'
import { validateEmail } from '../../utils/validate'
import { Button } from '../shared/Button'
import { Message } from '../shared/Message'

interface StateProps {
  signupSubmitting: boolean
  signupSuccess: boolean
  signupError: ClientApiError | null
}

interface DispatchProps {
  submitSignup: (params: SignupParams) => void
}

type Props = StateProps & DispatchProps

interface OwnState {
  confirmPassword: string
  email: string
  firstName: string
  lastName: string
  password: string
}

class Signup extends React.Component<Props, OwnState> {
  render() {
    return (
      <div className="login h100">
        <div className="login__container">
          <div className="login__header">Signup to Expensus</div>
          <form className="login__form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="login__input"
              placeholder="First Name"
              name="firstName"
              onChange={this.handleChange}
            />
            <input
              type="text"
              className="login__input"
              placeholder="Last Name"
              name="lastName"
              onChange={this.handleChange}
            />
            <input
              type="text"
              className="login__input"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
            <input
              type="password"
              className="login__input"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
            <input
              type="password"
              className="login__input"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={this.handleChange}
            />
            <Button type="submit" className="login__button">
              Signup
            </Button>
          </form>
          <Message visible={!!this.props.signupError} type="error">
            {this.handleSignupError()}
          </Message>
          <Message className="login__message">
            Already have an account? <Link to="/login">Login here</Link>
          </Message>
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = {
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  }

  // TODO: find a way to type this effectively
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateForm() {
    const firstName = this.state.firstName
    const lastName = this.state.lastName
    const emailValid = validateEmail(this.state.email)
    const passwordValid = Boolean(this.state.password.length > 7)
    const confirmPassword = Boolean(
      this.state.confirmPassword === this.state.password
    )
    return (
      firstName && lastName && emailValid && passwordValid && confirmPassword
    )
  }

  passwordsDontMatch() {
    return (
      this.state.password.length > 0 &&
      this.state.confirmPassword.length > 0 &&
      this.state.password !== this.state.confirmPassword
    )
  }

  passwordLengthWarning() {
    return this.state.password.length > 0 && this.state.password.length < 8
  }

  handleSubmit() {
    if (this.validateForm()) {
      this.props.submitSignup({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      })
    }
  }

  handleSignupError() {
    const err = this.props.signupError
    if (!err) return null
    if (err.type === 'client_error' && err.message.includes('422')) {
      return 'Email address taken, please try again'
    } else {
      return 'Sorry! Something went wrong, please try again.'
    }
  }
}

const connected = connect<StateProps, DispatchProps, {}, State>(
  state => ({
    signupError: selectSignupError(state),
    signupSubmitting: selectSignupSubmitting(state),
    signupSuccess: selectSignupSuccess(state),
  }),
  (dispatch: Dispatch<State>) => ({
    submitSignup: params => dispatch(submitSignup(params)),
  })
)(Signup)

export { connected as Signup }
