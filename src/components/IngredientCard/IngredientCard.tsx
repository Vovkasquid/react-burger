import React from 'react'
import styles from './IngredientCard.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

export default function IngredientCard({bread, index}:any) {
  return (
  <div key={bread._id} className={`${styles.ingredientsCard} ml-4`}>
    <img src={bread.image} className={`${styles.ingredientsImg} ml-4 mr-4 `} alt='изображение ингридиета' />
    <p className={`${styles.ingredientsPrice} text text_type_digits-default`}>{bread.price}<CurrencyIcon type="primary" /></p>
    <p className={`${styles.ingredientsName} text text_type_main-default`}>{bread.name}</p>
    {index === 0 && <Counter size="default" count={index+1}/>}
  </div>
  )
}