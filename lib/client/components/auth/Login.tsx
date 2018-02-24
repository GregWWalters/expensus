import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { ClientApiError } from '../../../types/api'
import { LoginParams } from '../../../types/api/auth.types'
import State from '../../../types/state'
import { submitLogin } from '../../actions/AuthActions'
import {
  selectLoginError,
  selectLoginSubmitting,
  selectLoginSuccess,
} from '../../state/selectors/auth'
import { validateEmail } from '../../utils/validate'
import { Button } from '../shared/Button'
import { Message } from '../shared/Message'
import { TextInput } from '../shared/TextInput'

interface StateProps {
  loginSubmitting: boolean
  loginSuccess: boolean
  loginError: ClientApiError | null
}

interface DispatchProps {
  submitLogin: (params: LoginParams) => void
}

type Props = StateProps & DispatchProps

interface OwnState {
  email: string
  password: string
}

class Login extends React.Component<Props, OwnState> {
  render() {
    return (
      <div className="login h100">
        <div className="login__container">
          <div className="login__header">Login to your account</div>
          <form className="login__form" onSubmit={this.handleSubmit}>
            <TextInput
              className="login__input text-input--transparent"
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <TextInput
              className="login__input text-input--transparent"
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              className="login__button btn--light"
              disabled={!this.validateForm()}
              loading={this.props.loginSubmitting}>
              Login
            </Button>
          </form>
          <Message
            className="login__message"
            visible={!!this.props.loginError}
            type="error">
            {this.handleLoginError()}
          </Message>
          <Message className="login__message">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </Message>
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  state = { email: '', password: '' }

  // TODO: find a way to type this effectively
  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }

  validateForm() {
    const emailValid = validateEmail(this.state.email)
    const passwordValid = Boolean(this.state.password.length > 7)
    return emailValid && passwordValid
  }

  handleSubmit(e) {
    e && e.preventDefault()
    if (this.validateForm()) {
      this.props.submitLogin({
        email: this.state.email,
        password: this.state.password,
      })
    }
  }

  handleLoginError() {
    const err = this.props.loginError
    if (!err) return null
    if (err.type === 'unauthorized') {
      return 'Email address or password incorrect, please try again.'
    } else {
      return 'Sorry! Something went wrong, please try again.'
    }
  }
}

const connected = connect<StateProps, DispatchProps, {}, State>(
  state => ({
    loginError: selectLoginError(state),
    loginSubmitting: selectLoginSubmitting(state),
    loginSuccess: selectLoginSuccess(state),
  }),
  (dispatch: Dispatch<State>) => ({
    submitLogin: params => dispatch(submitLogin(params)),
  })
)(Login)

export { connected as Login }
