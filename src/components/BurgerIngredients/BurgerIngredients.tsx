import React from 'react'
import styles from './BurgerIngredients.module.css'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { breads } from '../../utils/data.js'

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState('Булки')
  return(
    <section className={`${styles.burgerIngredients} pt-10`}>
      <h2 className={`${styles.ingredientsHeader} text text_type_main-large mb-10`}>Соберите бургер</h2>
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
    <ul className={`${styles.breadsContainer}`}>
      {breads.map((bread, index) => (
        <div key={bread._id} className={`${styles.ingredientsCard} ml-4`}>
          <img src={bread.image} className={`${styles.ingredientsImg} ml-4 mr-4 `} alt='изображение ингридиета' />
          <p className={`${styles.ingredientsPrice} text text_type_digits-default`}>{bread.price}<CurrencyIcon type="primary" /></p>
          <p className={`text text_type_main-default`}>{bread.name}</p>
          {index === 0 && <Counter size="default" count={index+1}/>}
        </div>
     ))}
    </ul>
    <p className={`${styles.chapter} text text_type_main-medium mt-10 mb-6`}>Соусы</p>
    </section>
  )
}