import c from 'classname'
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
}) => (
  <button
    className={c(className, 'btn', {
      'btn--loading spinner': loading,
      'btn--disabled': disabled,
    })}
    onClick={disabled ? noop : onClick}
    type={type}>
    {children}
  </button>
)

export { Button }
