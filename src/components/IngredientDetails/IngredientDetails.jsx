import React from 'react'
import styles from './IngredientDetails.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { SET_DETAIL_INGREDIENT } from '../../services/actions/detailIngredient'

const IngredientDetails = () => {
  const { receivedComponents } = useSelector(state => state.receivedComponents)
  const { ingredient } = useSelector(state => state.detailIngredient)
  const { ingredientId } = useParams()
  const [isNotModal, setIsNotModal] = React.useState(false)
  const dispatch = useDispatch()

  // Надо получить список компонентов и выдернуть оттуда один с нужным айди
  React.useEffect(() => {
    if (!ingredient?.name) {
      setIsNotModal(true)
      // Ищем по айди компонент
      const foundIngredient = receivedComponents.find(item => {
        return item._id === ingredientId;
      })
      // Записываем компонент в стор
      dispatch({ type: SET_DETAIL_INGREDIENT, ingredient: foundIngredient })

    }
  }, [ingredient, receivedComponents])

  return (
    <div style={{marginTop: isNotModal ? '120px' : 0}} className={styles.ingredientContainer}>
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

export default IngredientDetails
