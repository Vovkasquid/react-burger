import React from 'react'
import PropTypes from 'prop-types'
import styles from './BurgerConstructor.module.css'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem.jsx'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientSchema } from '../../utils/schemas'
import { IngredientContext } from '../../services/IngredientsContext'
import { PriceContext } from '../../services/PriceContext'

export default function BurgerConstructor({ openIngredientModal, openOrderModal, choosenBun }) {
  const { mainIngrediets } = React.useContext(IngredientContext)
  const { totalPrice } = React.useContext(PriceContext)
  
  return (
    <section className={`${styles.burgerConstructorContainer} pt-25 pl-4 pr-4`}>
      <div className={`${styles.burgerConstructorList} mb-10`}>
          <BurgerConstructorItem item={choosenBun} isLocked openModal={openIngredientModal} isTop/>
          <ul className={`${styles.burgerConstructorScrollList} ${styles.scrollZone}`}>
            {mainIngrediets?.map((item, index) => {
              return (
                <li key={index}>
                  <BurgerConstructorItem item={item} openModal={openIngredientModal} />
                </li>
              )
            })}
          </ul>
          <BurgerConstructorItem item={choosenBun} isLocked openModal={openIngredientModal} isBottom />
      </div>
      <div className={`${styles.burgerConstructorPriceContainer} mt-10`}>
        <p className={`${styles.burgerConstructorPrice} text text_type_main-large`}>{totalPrice.price}<CurrencyIcon type="primary" /></p>
        <Button type="primary" size="medium" onClick={() => openOrderModal()} >
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  openIngredientModal: PropTypes.func.isRequired,
  openOrderModal: PropTypes.func.isRequired,
  choosenBun: ingredientSchema,
}