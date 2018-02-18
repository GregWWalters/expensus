import React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react'
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
  signupError: string | null
}

interface DispatchProps {
  submitSignup: (params: SignupParams) => void
}

type Props = StateProps & DispatchProps

interface OwnState {
  email: string
  password: string
  error: {
    email: string
    password: string
    result: string
  }
}

class Signup extends React.Component<Props, OwnState> {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: { email: '', password: '', confirmPassword: '', result: '' },
  }

  handleChange = (e, { name, value }) => {
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

  handleSubmit = () => {
    if (this.validateForm()) {
      console.log('Form valid, data: ', {
        email: this.state.email,
        password: this.state.password,
      })
      console.log('Submitting!')
      this.props.submitSignup({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      })
    } else {
      this.setState({
        error: { ...this.state.error, result: 'Form invalid' },
      })
    }
  }

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
            <Message error={true} visible={!!this.state.error.result}>
              {this.state.error.result}
            </Message>
            <Message error={true} visible={!!this.props.signupError}>
              {this.props.signupError}
            </Message>
            <Button primary={true} fluid={true} type="submit">
              Signup
            </Button>
            <Message>
              Already have an account? <Link to="/login">Login here</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
    )
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
