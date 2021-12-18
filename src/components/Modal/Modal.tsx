import React from 'react'
import styles from './Modal.module.css'
import ModalOverley from '../ModalOverley/ModalOverley'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Modal = () => {
  return (
    <ModalOverley>
      <div className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <div className={styles.modalHeader}>
          <h3 className={`text text_type_main-large`}>Детали ингридиета</h3>
          <CloseIcon type="primary" />
        </div>
      </div>
    </ModalOverley>
  )
}

export default Modal