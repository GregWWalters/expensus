import { ReactWrapper } from 'enzyme'
import React from 'react'
import { Store } from 'redux'
import { mountWithStoreAndMemoryRouter } from '../../../test/enzyme'
import State from '../../types/state'
import { App } from '../App'
import configureStore from '../state/store'

describe('App', () => {
  let store: Store<State>
  let wrapper: ReactWrapper

  beforeEach(() => {
    store = configureStore()

    wrapper = mountWithStoreAndMemoryRouter(store, <App />)
  })

  it('renders without exploding', () => {
    expect(wrapper.find(App).length).toBe(1)
  })
})
