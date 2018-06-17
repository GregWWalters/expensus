import { mount, MountRendererProps } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, MemoryRouterProps } from 'react-router'
import { Store } from 'redux'

export function mountWithStore<P, S>(
  store: Store<S>,
  elem: React.ReactElement<P>,
  options?: Partial<MountRendererProps>
) {
  return mount(<Provider store={store}>{elem}</Provider>, { ...options })
}

export function mountWithStoreAndMemoryRouter<P, S>(
  store: Store<S>,
  elem: React.ReactElement<P>,
  routerOptions?: MemoryRouterProps,
  mountOptions?: Partial<MountRendererProps>
) {
  return mount(
    <Provider store={store}>
      <MemoryRouter {...routerOptions}>{elem}</MemoryRouter>
    </Provider>
  )
}
