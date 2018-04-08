import c from 'classnames'
import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { Icon } from './Icon'

interface Props {
  className?: string
  isOpen: boolean
  onCloseClick: () => void
  size?: 'small' | 'medium' | 'large'
  title?: string
}

const Modal: React.SFC<Props> = ({
  children,
  className,
  isOpen,
  onCloseClick,
  size = 'medium',
  title,
}) => {
  return (
    <CSSTransition
      classNames={{
        enter: 'modal-with-screen--enter',
        enterActive: 'modal-with-screen--enter-active',
        exit: 'modal-with-screen--exit',
        exitActive: 'modal-with-screen--exit-active',
      }}
      in={isOpen}
      timeout={150}
      unmountOnExit={true}>
      <div className="modal-with-screen">
        <div className="screen screen--light" onClick={onCloseClick} />
        <div className={c('modal', `modal--${size}`, className)}>
          {title && (
            <div className="modal__header">
              <div className="modal__title">{title}</div>
              <div onClick={onCloseClick} className="modal__close-button">
                <Icon iconName="close" size="medium" />
              </div>
            </div>
          )}
          {!title && (
            <div onClick={onCloseClick} className="modal__close-button">
              <Icon iconName="close" size="medium" />
            </div>
          )}
          <div className="modal__content">{children}</div>
        </div>
      </div>
    </CSSTransition>
  )
}

export { Modal }
