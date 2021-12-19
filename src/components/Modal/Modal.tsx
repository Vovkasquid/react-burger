import React from 'react'
import styles from './Modal.module.css'
import ModalOverley from '../ModalOverley/ModalOverley.jsx'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import succesIcon from '../../images/successIcon.svg'

const Modal = ( { isModalVisible, closePopup, ingredient, isOrder } : any ) => {
  const listenEscHandler = (event : any) => {
    if (event.key === 'Escape') {
      closePopup()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', listenEscHandler)
    return  () => document.removeEventListener('keydown', listenEscHandler)
  }, [])
  
  return (
    <ModalOverley isModalVisible={isModalVisible} >
      {isOrder
      ?
      <div className={`${styles.modal} pb-30 pt-30`}>
        <button className={`${styles.closeButton} ${styles.closeButtonFixed}`}><CloseIcon type="primary" onClick={closePopup} /></button>
        <p className="text text_type_digits-large mb-8">034536</p>
        <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
        <img src={succesIcon} className={`${styles.successImage} mb-15`} alt="изображение картинки успешного заказа" />
        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
      :
      <div className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <div className={styles.modalHeaderContainer}>
          <h3 className={`${styles.modalHeader} text text_type_main-large`}>Детали ингредиента</h3>
          <button className={styles.closeButton}><CloseIcon type="primary" onClick={closePopup} /></button>
        </div>
        <img alt="картинка ингредиента" src={ingredient?.image} className={styles.ingredientImage} />
        <div className={styles.ingredientDescriptionContainer}>
          <p className={`text text_type_main-medium mb-8`}>{ingredient?.name}</p>
          <ul className={`${styles.coloriesList}`}>
            <li className={styles.coloriesItem}>
              <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
              <p className="text text_type_digits-default text_color_inactive">{ingredient?.calories}</p>
            </li>
            <li className={styles.coloriesItem}>
              <p className="text text_type_main-default text_color_inactive">Белки, г</p>
              <p className="text text_type_digits-default text_color_inactive">{ingredient?.proteins}</p>
            </li>
            <li className={styles.coloriesItem}>
              <p className="text text_type_main-default text_color_inactive"> Жиры, г</p>
              <p className="text text_type_digits-default text_color_inactive">{ingredient?.fat}</p>
            </li>
            <li className={styles.coloriesItem}>
              <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className="text text_type_digits-default text_color_inactive">{ingredient?.carbohydrates}</p>
            </li>
          </ul>
        </div>
      </div>}
    </ModalOverley>
  )
}

export default Modal