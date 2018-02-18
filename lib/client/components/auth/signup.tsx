import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react'
import { validateEmail } from '../../utils/validate'

interface OwnState {
  email: string
  password: string
  error: {
    email: string
    password: string
    result: string
  }
}

export class Signup extends React.Component<{}, OwnState> {
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
    } else {
      this.setState({ error: { ...this.state.error, result: 'Form invalid' } })
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
