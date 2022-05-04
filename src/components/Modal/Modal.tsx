import React, {  FC } from "react";
import styles from './Modal.module.css'
import ModalOverley from '../ModalOverley/ModalOverley'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom'
import { TModal } from '../../utils/types'

const modalRoot:HTMLDivElement = document.getElementById('modal') as HTMLDivElement

const Modal: FC<TModal> = ( { closePopup, children, title } ) => {
  const listenEscHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closePopup()
    }
  }

  React.useEffect(() => {
    // @ts-ignore
    document.addEventListener('keydown', listenEscHandler)
    // @ts-ignore
    return  () => document.removeEventListener('keydown', listenEscHandler)
  }, [closePopup])

  return ReactDOM.createPortal(
    <ModalOverley closePopup={closePopup} >
    <div className={!title ? `${styles.modal} pb-30 pt-30` : `${styles.modal} pt-10 pr-10 pb-15 pl-10`}>
        {!title ?
          <button
            className={`${styles.closeButton} ${styles.closeButtonFixed}`}
          >
            <CloseIcon type="primary" onClick={closePopup} />
          </button>
          :
          <div className={styles.modalHeaderContainer}>
            <h3 className={`${styles.modalHeader} text text_type_main-large`}>{title}</h3>
            <button className={styles.closeButton}><CloseIcon type="primary" onClick={closePopup} /></button>
          </div>
        }
        {children}
      </div>
    </ModalOverley>

  , modalRoot)
}

export default Modal

