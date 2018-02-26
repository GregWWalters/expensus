import React from 'react'
import { Column, HorizontalDivider } from '../shared/Layouts'
import { GroupCreateForm } from './GroupCreateForm'

// TODO: redirect here if user already has a group
const GroupCreate: React.SFC = () => (
  <Column className="group-create" maxWidth="700px">
    <div className="group-create__header">
      Looks like you're not in a group yet
      <br />
      Create one today to start using Expensus
    </div>
    <HorizontalDivider />
    <GroupCreateForm />
  </Column>
)

export { GroupCreate }
