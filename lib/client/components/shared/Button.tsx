import c from 'classnames'
import React from 'react'
import { noop } from '../../utils/noop'

interface Props {
  children: React.ReactNode
  className?: string
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any
}

const Button: React.SFC<Props> = ({
  children,
  className,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
}) => {
  // todo: make color-scheme a selectable property from props
  // rather than relying on css
  const darkSpinner = className && className.includes('btn--light')
  return (
    <button
      className={c(className, 'btn', {
        'btn--loading spinner': loading,
        'spinner--dark': Boolean(loading && darkSpinner),
        'btn--disabled': disabled,
      })}
      onClick={disabled ? noop : onClick}
      type={type}>
      {children}
    </button>
  )
}

export { Button }
