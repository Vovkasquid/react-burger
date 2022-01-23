import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.module.css'
import ModalOverley from '../ModalOverley/ModalOverley.jsx'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal')

const Modal = ( { closePopup, children, title } ) => {
  const listenEscHandler = (event) => {
    if (event.key === 'Escape') {
      closePopup()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', listenEscHandler)
    return  () => document.removeEventListener('keydown', listenEscHandler)
  }, [])
  
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

Modal.propTypes = {
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
}