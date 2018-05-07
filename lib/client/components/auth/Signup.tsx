import React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RequestState } from '../../../types'
import { ClientApiError } from '../../../types/api'
import { SignupParams } from '../../../types/api/auth'
import State from '../../../types/state'
import { submitSignup } from '../../actions/AuthActions'
import {
  selectSignupError,
  selectSignupStatus,
} from '../../state/selectors/auth'
import { validateEmail } from '../../utils/validate'
import { Button } from '../shared/Button'
import { Message } from '../shared/Message'
import { TextInput } from '../shared/TextInput'

interface StateProps {
  signupStatus: RequestState
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

class Signup extends React.PureComponent<Props, OwnState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    const { signupError, signupStatus } = this.props
    return (
      <div className="login h100">
        <div className="login__container">
          <div className="login__header">Signup to Expensus</div>
          <form className="login__form" onSubmit={this.handleSubmit}>
            <TextInput
              type="text"
              className="login__input text-input--transparent"
              placeholder="First Name"
              name="firstName"
              onChange={this.handleChange}
            />
            <TextInput
              type="text"
              className="login__input text-input--transparent"
              placeholder="Last Name"
              name="lastName"
              onChange={this.handleChange}
            />
            <TextInput
              type="text"
              className="login__input text-input--transparent"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
            <TextInput
              type="password"
              className="login__input text-input--transparent"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
            <TextInput
              type="password"
              className="login__input text-input--transparent"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={this.handleChange}
            />
            <Button
              className="login__button btn--light"
              disabled={!this.validateForm()}
              loading={signupStatus === RequestState.REQUESTING}
              type="submit">
              Signup
            </Button>
          </form>
          <Message
            className="login__message"
            visible={!!signupError}
            type="error">
            {this.handleSignupError()}
          </Message>
          <Message className="login__message">
            Already have an account? <Link to="/login">Login here</Link>
          </Message>
        </div>
      </div>
    )
  }

  // TODO: find a way to type this effectively
  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
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

  handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
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
    signupStatus: selectSignupStatus(state),
  }),
  (dispatch: Dispatch<State>) => ({
    submitSignup: params => dispatch(submitSignup(params)),
  })
)(Signup)

export { connected as Signup }
