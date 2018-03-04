import c from 'classnames'
import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  type?: 'error' | 'warning' | 'normal'
  visible?: boolean
}

const Message: React.SFC<Props> = ({
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

export { Message }
