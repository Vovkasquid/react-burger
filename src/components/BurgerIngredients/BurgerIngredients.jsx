import React from 'react'
import PropTypes from 'prop-types'
import styles from './BurgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCard from '../IngredientCard/IngredientCard.jsx'
import { filterBun, filterSauces } from '../App/App'
import { useSelector } from 'react-redux'

export default function BurgerIngredients({ openModal }) {
  // Получаем из стора компоненты и фильтруем их
  const ingredients = useSelector(state => state.receivedComponents.receivedComponents)
  const bun = filterBun(ingredients)
  const sauces = filterSauces(ingredients)

  const [current, setCurrent] = React.useState('Булки')
  return(
    <section className={`${styles.burgerIngredients} pt-10`} >
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
    <div className={styles.scrollZone}>
      <ul className={`${styles.ingredientsContainer}`}>
        {bun?.map((bread, index) => (
          <li key={index}>
            <IngredientCard ingredient={bread} index={index} openModal={openModal} />
          </li>
      ))}
      </ul>
      <p className={`${styles.chapter} text text_type_main-medium mt-10 mb-6`}>Соусы</p>
      <ul className={`${styles.ingredientsContainer}`}>
        {sauces?.map((sauce, index) => (
          <li key={index}>
            <IngredientCard ingredient={sauce} index={index} openModal={openModal}/>
          </li>
      ))}
      </ul>
    </div>
    </section>
  )
}

IngredientCard.propTypes = {
  openModal: PropTypes.func.isRequired,
}