import React from 'react'
import PropTypes from 'prop-types'
import styles from './BurgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCard from '../IngredientCard/IngredientCard.jsx'
import { useSelector } from 'react-redux'
import { useTabType } from '../../hooks/useTabType'

export default function BurgerIngredients({ openModal }) {
  // Получаем из стора компоненты и фильтруем их
  const { mainIngredients, bun, sauces } = useSelector(state => state.receivedComponents)

  const [current, setCurrent] = React.useState('Булки')
  const bunRef = React.useRef()
  const sauceRef = React.useRef()
  const mainIngredientRef = React.useRef()
  const { listRef, onScroll, tabType } = useTabType([
    bunRef,
    sauceRef,
    mainIngredientRef,
  ])
  React.useEffect(() => {
    switch (tabType) {
      case 'bun': {
        setCurrent('Булки')
        break
      }
      case 'sauces': {
        setCurrent('Соусы')
        break
      }
      case 'mainIngredients': {
        setCurrent('Начинки')
        break
      }
      default: {
        setCurrent('Булки')
      }
    }
  }, [tabType])
  return (
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
    <div className={styles.scrollZone} ref={listRef} onScroll={onScroll}>
      <ul id="bun" ref={bunRef} className={`${styles.ingredientsContainer}`}>
        {bun && bun?.map((bread, index) => (
          <li key={index}>
            <IngredientCard ingredient={bread} openModal={openModal} />
          </li>
      ))}
      </ul>
      <p className={`${styles.chapter} text text_type_main-medium mt-10 mb-6`}>Соусы</p>
      <ul id="sauces" ref={sauceRef} className={`${styles.ingredientsContainer}`}>
        {sauces && sauces?.map((sauce, index) => (
          <li key={index}>
            <IngredientCard ingredient={sauce} openModal={openModal}/>
          </li>
      ))}
      </ul>
      <p className={`${styles.chapter} text text_type_main-medium mt-10 mb-6`}>Начинки</p>
      <ul id="mainIngredients" ref={mainIngredientRef} className={`${styles.ingredientsContainer}`}>
        {mainIngredients && mainIngredients?.map((sauce, index) => (
          <li key={index}>
            <IngredientCard ingredient={sauce} openModal={openModal}/>
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