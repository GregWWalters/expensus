import c from 'classname'
import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  type?: 'error' | 'warning' | 'normal'
  visible?: boolean
}

export const Message: React.SFC<Props> = ({
  children,
  className,
  type = 'normal',
  visible = true,
}) =>
  visible ? (
    <div
      className={c(className, 'message', {
        'message--error': type === 'error',
        'message--warning': type === 'warning',
      })}>
      {children}
    </div>
  ) : null
