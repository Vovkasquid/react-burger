import React from 'react'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'
import { useLocation, Link } from 'react-router-dom'
import styles from './IngredientCard.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientSchema } from '../../utils/schemas'

export default function IngredientCard({ ingredient, openModal }) {
  const location = useLocation()
  const ingredientId = ingredient['_id'];
  // Передаём в хук тип элемента и сам игредиент
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  })
  return (
    <Link
      key={ingredientId}
      to={{
        // Тут мы формируем динамический путь для нашего ингредиента
        // а также сохраняем в свойство background роут, на котором была открыта наша модалка
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={styles.link}
      ref={dragRef}
    >
      <div className={`${styles.ingredientsCard}`} onClick={() => openModal(ingredient)}>
        <img src={ingredient.image} className={`${styles.ingredientsImg} ml-4 mr-4 `} alt='изображение ингридиета' />
        <p className={`${styles.ingredientsPrice} text text_type_digits-default`}>{ingredient.price}<CurrencyIcon type="primary" /></p>
        <p className={`${styles.ingredientsName} text text_type_main-default`}>{ingredient.name}</p>
        {!!ingredient.counter && <Counter size="default" count={ingredient.counter}/>}
      </div>
    </Link>
  )
}

IngredientCard.propTypes = {
  ingredient: ingredientSchema.isRequired,
  openModal: PropTypes.func.isRequired,
}