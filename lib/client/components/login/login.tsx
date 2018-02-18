import React from 'react'
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

export default class Login extends React.Component<{}, OwnState> {
  state = {
    email: '',
    password: '',
    error: { email: '', password: '', result: '' },
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  validateForm() {
    const emailValid = validateEmail(this.state.email)
    const passwordValid = Boolean(this.state.password.length > 7)
    return emailValid && passwordValid
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
            <Message error={true} visible={!!this.state.error.result}>
              {this.state.error.result}
            </Message>
            <Button primary={true} fluid={true} type="submit">
              Login
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}
