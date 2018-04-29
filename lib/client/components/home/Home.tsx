import React from 'react'
import { FlexWindow } from '../shared/Layouts'
import { UnallocatedTransactions } from '../transaction/UnallocatedTransactions'

export const Home: React.SFC = () => (
  <FlexWindow className="home">
    <UnallocatedTransactions />
  </FlexWindow>
)
