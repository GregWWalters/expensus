import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react'
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
  error: {
    email: boolean
    password: boolean
    message: string
  }
}

class Login extends React.Component<Props, OwnState> {
  render() {
    return (
      <Grid textAlign="center" className="h100" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header size="large" color="blue" className="login__header">
            Login to your account
          </Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              placeholder="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Message error={true} visible={!!this.props.loginError}>
              {this.handleLoginError()}
            </Message>
            <Button
              primary={true}
              fluid={true}
              loading={this.props.loginSubmitting}
              type="submit"
              disabled={!this.validateForm()}>
              Login
            </Button>
            <Message>
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  state = {
    email: '',
    password: '',
    error: { email: false, password: false, message: '' },
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }

  validateForm() {
    const emailValid = validateEmail(this.state.email)
    const passwordValid = Boolean(this.state.password.length > 7)
    return emailValid && passwordValid
  }

  handleSubmit() {
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
