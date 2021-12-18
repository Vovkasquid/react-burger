import React from 'react'
import styles from './Modal.module.css'
import ModalOverley from '../ModalOverley/ModalOverley.jsx'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Modal = ( { isModalVisible, image } : any ) => {
  return (
    <ModalOverley isModalVisible={isModalVisible} >
      <div className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <div className={styles.modalHeaderContainer}>
          <h3 className={`${styles.modalHeader} text text_type_main-large`}>Детали ингредиента</h3>
          <button className={styles.closeButton}><CloseIcon type="primary" /></button>
        </div>
      </div>
    </ModalOverley>
  )
}

export default Modal
// <div className={`${isModalVisible ? `${styles.modal} ${styles.modalActive}` : styles.modal} pt-10 pr-10 pb-15 pl-10`}>