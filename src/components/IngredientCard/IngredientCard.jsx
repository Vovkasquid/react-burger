import React from 'react'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'
import styles from './IngredientCard.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientSchema } from '../../utils/schemas'

export default function IngredientCard({ ingredient, index, openModal }) {
  // Передаём в хук тип элемента и сам игредиент
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  })
  return (
  <div className={`${styles.ingredientsCard}`} ref={dragRef} onClick={() => openModal(ingredient)}>
    <img src={ingredient.image} className={`${styles.ingredientsImg} ml-4 mr-4 `} alt='изображение ингридиета' />
    <p className={`${styles.ingredientsPrice} text text_type_digits-default`}>{ingredient.price}<CurrencyIcon type="primary" /></p>
    <p className={`${styles.ingredientsName} text text_type_main-default`}>{ingredient.name}</p>
    {index === 0 && <Counter size="default" count={index+1}/>}
  </div>
  )
}

IngredientCard.propTypes = {
  ingredient: ingredientSchema.isRequired,
  index: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
}