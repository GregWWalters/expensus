export default class UserRequiredError extends Error {
  constructor(message?) {
    super(message)
    this.name = 'UserRequiredError'
  }
}
