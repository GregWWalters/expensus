import c from 'classnames'
import React from 'react'
import { FlexWindow, FullWindow } from './Layouts'

interface SpinnerProps {
  className?: string
  dark?: boolean
}

const FlexWindowSpinner: React.SFC<SpinnerProps> = ({
  className,
  dark = true,
}) => (
  <FlexWindow
    className={c(className, 'spinner', {
      'spinner--dark': dark,
    })}
  />
)

const FullWindowSpinner: React.SFC<SpinnerProps> = ({
  className,
  dark = true,
}) => (
  <FullWindow
    className={c(className, 'spinner', {
      'spinner--dark': dark,
    })}
  />
)

const RowSpinner: React.SFC<SpinnerProps> = ({ className, dark = true }) => (
  <div
    className={c(className, 'spinner', 'row-spinner', {
      'spinner--dark': dark,
    })}
  />
)

export { FlexWindowSpinner, FullWindowSpinner, RowSpinner }
