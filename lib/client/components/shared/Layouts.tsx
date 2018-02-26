import c from 'classname'
import React from 'react'

type Overflow = 'auto' | 'hidden' | 'scroll'

interface WindowProps {
  children?: React.ReactNode
  className?: string
  flex?: 'column' | 'row'
  overflow?: Overflow
  padding?: boolean
}

/** FullWindow will fill up available space using
 *  `height: 100%` & `width: 100%`
 *
 *  Provide a flex parameter to make FullWindow into a flex-container
 */
const FullWindow: React.SFC<WindowProps> = ({
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

/** FlexWindow will fill up vertical flex space using `flex: 1 0 0;` and
 *  horizontal space using `width: 100%`.
 *
 *  You can provide a flex parameter to set FlexWindow into a flex container.
 */
const FlexWindow: React.SFC<WindowProps> = ({
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

interface ColumnProps {
  children?: React.ReactNode
  className?: string
  overflow?: Overflow
  padding?: boolean
  width?: string
  maxWidth?: string
}

/** Column will create a flex-column that fills available vertical space
 *  and enforces a width or max-width, with itself as a flex container,
 *  set to column with align-center
 */
const Column: React.SFC<ColumnProps> = ({
  children,
  className,
  overflow = 'auto',
  padding = false,
  width,
  maxWidth,
}) => {
  return (
    <div
      className={c(className, 'column', {
        'column--padded': padding,
        'column--overflow-auto': overflow === 'auto',
        'column--overflow-hidden': overflow === 'hidden',
        'column--overflow-scroll': overflow === 'scroll',
      })}
      style={{ width, maxWidth }}>
      {children}
    </div>
  )
}

const HorizontalDivider: React.SFC = () => (
  <div className="horizontal-divider" />
)

export { Column, FlexWindow, FullWindow, HorizontalDivider }
