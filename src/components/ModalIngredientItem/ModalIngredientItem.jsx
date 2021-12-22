import React from 'react'
import styles from './ModalIngredientItem.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const ModalIngredientItem = ({closePopup, ingredient }) => {
  return (
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
    </div>
  )
}

export default ModalIngredientItem