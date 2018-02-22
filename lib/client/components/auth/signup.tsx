import React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react'
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
  error: {
    email: boolean
    password: boolean
    confirmPassword: boolean
    message: string
  }
  firstName: string
  lastName: string
  password: string
}

class Signup extends React.Component<Props, OwnState> {
  render() {
    return (
      <Grid textAlign="center" className="h100" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header size="large" color="blue" className="login__header">
            Signup
          </Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              placeholder="First name"
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Last Name"
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Confirm password"
              name="confirmPassword"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            <Button
              primary={true}
              fluid={true}
              loading={this.props.signupSubmitting}
              type="submit"
              disabled={!this.validateForm()}>
              Signup
            </Button>
            <Message error={true} visible={this.passwordsDontMatch()}>
              Passwords must match
            </Message>
            <Message error={true} visible={this.passwordLengthWarning()}>
              Password must be at least 8 characters
            </Message>
            <Message error={true} visible={!!this.props.signupError}>
              {this.handleSignupError()}
            </Message>
            <Message>
              Already have an account? <Link to="/login">Login here</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
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
    error: {
      email: false,
      password: false,
      confirmPassword: false,
      message: '',
    },
    firstName: '',
    lastName: '',
    password: '',
  }

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
