import React from 'react'
import { Button } from '../../shared/Button'
import { Column } from '../../shared/Layouts'

interface PlaidLinkable {
  plaidHandler: any
}

class GroupAccounts extends React.PureComponent implements PlaidLinkable {
  readonly plaidHandler

  constructor(props) {
    super(props)

    console.log('key: ', process.env.PLAID_API_KEY)
    // todo: type plaid better
    this.plaidHandler = (window as any).Plaid.create({
      clientName: 'Expensus Demo',
      env: 'sandbox',
      key: process.env.PLAID_API_KEY,
      product: ['transactions'],
      onload: () => {
        console.log('link loaded')
      },
      onSuccess: (token, meta) => {
        console.log('success!')
        console.log('token: ', token)
        console.log('metadata: ', meta)
      },
      onExit: (err, meta) => {
        console.log('err: ', err)
        console.log('meta: ', meta)
      },
      onEvent: (eventName, meta) => {
        console.log('eventName: ', eventName)
        console.log('meta: ', meta)
      },
    })
  }

  render() {
    return (
      <Column width="700px">
        <div>Account Management</div>
        <Button onClick={() => this.plaidHandler.open()}>Open Plaid</Button>
      </Column>
    )
  }
}

export { GroupAccounts }
