import React from 'react'
import styles from './ModalOrderItem.module.css'
import succesIcon from '../../images/successIcon.svg'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const ModalOrderItem = ({ closePopup }) => {
  return (
    <div className={`${styles.modal} pb-30 pt-30`}>
      <button className={`${styles.closeButton} ${styles.closeButtonFixed}`}><CloseIcon type="primary" onClick={closePopup} /></button>
      <p className="text text_type_digits-large mb-8">034536</p>
      <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
      <img src={succesIcon} className={`${styles.successImage} mb-15`} alt="изображение картинки успешного заказа" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default ModalOrderItem