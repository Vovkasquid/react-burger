import React from 'react'
import styles from './BurgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { breads, sauces } from '../../utils/data.js'
import IngredientCard from '../IngredientCard/IngredientCard'

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState('Булки')
  return(
    <section className={`${styles.burgerIngredients} pt-10`}>
      <h2 className={`${styles.ingredientsContainer} text text_type_main-large mb-10`}>Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
    </div>
    <p className={`${styles.chapter} text text_type_main-medium mt-10 mb-6`}>Булки</p>
    <ul className={`${styles.ingredientsContainer}`}>
      {breads.map((bread, index) => (
        <li key={index}>
          <IngredientCard ingredient={bread} index={index} />
        </li>
     ))}
    </ul>
    <p className={`${styles.chapter} text text_type_main-medium mt-10 mb-6`}>Соусы</p>
    <ul className={`${styles.ingredientsContainer}`}>
      {sauces.map((sauce, index) => (
        <li key={index}>
          <IngredientCard ingredient={sauce} index={index} />
        </li>
     ))}
    </ul>
    </section>
  )
}