import c from 'classnames'
import React from 'react'
import { IconName } from '../../../types/icons'

interface Props {
  iconName: IconName
  className?: string
  size?: 'small' | 'medium' | 'large'
}

const Icon: React.SFC<Props> = ({
  className = '',
  iconName,
  size = 'medium',
}) => (
  <i
    className={c(
      className,
      'mdi-icon',
      'mdi',
      `mdi-${iconName}`,
      `mdi-icon--${size}`
    )}
  />
)

export { Icon }
