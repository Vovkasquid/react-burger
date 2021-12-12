import React from 'react';
import styles from './BurgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState('Булки')
  return(
    <section className={`${styles.burgerIngredients} pt-10`}>
      <h2 className={`${styles.ingredientsHeader} text text_type_main-large mb-10`}>Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value='Булки>' active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
    </div>
    </section>
  )
}