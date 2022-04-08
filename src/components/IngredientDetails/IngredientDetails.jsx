import React from 'react'
import styles from './IngredientDetails.module.css'
import { useSelector } from 'react-redux'

const IngredientDetails = () => {
  const { ingredient } = useSelector(state => state.detailIngredient)
  return (
    <>
      <img alt="картинка ингредиента" src={ingredient?.image} className={styles.ingredientImage} /><div className={styles.ingredientDescriptionContainer}>
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
  </>
  )
}

export default IngredientDetails
