import c from 'classname'
import React from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
  flex?: 'column' | 'row'
  overflow?: 'auto' | 'hidden' | 'scroll'
  padding?: boolean
}

/** FullWindow will fill up available vertical space using height: 100%
 *  Provide a flex parameter to make FullWindow into a flex-container
 */
export const FullWindow: React.SFC<Props> = ({
  children,
  className,
  flex,
  padding = false,
  overflow = 'auto',
}) => (
  <div
    className={c(className, 'full-window', {
      'full-window--padded': padding,
      'full-window--overflow-auto': overflow === 'auto',
      'full-window--overflow-hidden': overflow === 'hidden',
      'full-window--overflow-scroll': overflow === 'scroll',
      'full-window--flex-column': flex === 'column',
      'full-window--flex-row': flex === 'row',
    })}>
    {children}
  </div>
)

/** FlexWindow will fill up available flex space using flex: 1 0 0; */
export const FlexWindow: React.SFC<Props> = ({
  children,
  className,
  flex,
  padding = false,
  overflow = 'auto',
}) => (
  <div
    className={c(className, 'flex-window', {
      'flex-window--padded': padding,
      'flex-window--overflow-auto': overflow === 'auto',
      'flex-window--overflow-hidden': overflow === 'hidden',
      'flex-window--overflow-scroll': overflow === 'scroll',
      'flex-window--flex-column': flex === 'column',
      'flex-window--flex-row': flex === 'row',
    })}>
    {children}
  </div>
)
