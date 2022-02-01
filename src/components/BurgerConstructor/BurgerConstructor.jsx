import React from 'react'
import PropTypes from 'prop-types'
import styles from './BurgerConstructor.module.css'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem.jsx'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd'
import { v4 as generateUniqueId } from 'uuid'
import { ADD_CONSTRUCTOR_ITEM, SET_CHOOSEN_BUN } from '../../services/actions/burgerConstructorIngredients';
import { INC_COUNTER_INGREDIENT } from "../../services/actions/receivedComponents";

export default function BurgerConstructor({ openIngredientModal, openOrderModal }) {
  // Вытаскиваем из стора полученные компоненты и отфильтровываем нужные
  const  { ingredients, choosenBun } = useSelector(store => store.constructorItems)
  const dispatch = useDispatch()

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if (item.type === 'bun') {
        dispatch({ type: SET_CHOOSEN_BUN, bun: item })
        dispatch({ type: INC_COUNTER_INGREDIENT, item: item })
      } else {
        dispatch({ type: ADD_CONSTRUCTOR_ITEM, ingredient: item, key: generateUniqueId() })
        dispatch({ type: INC_COUNTER_INGREDIENT, item: item })
      }
    },
  })
  const orderPrice = React.useMemo(() => {
    if (choosenBun && ingredients) {
     return ingredients?.reduce((prevPrice, item) => prevPrice + item.price, 0) + 2 * choosenBun.price
    } else {
      return 0
    }
  }
  , [ingredients, choosenBun] )

  const onSubmitBurger = () => {
    // const ingredientArray = mainIngredients?.map(item => item._id)
    // openOrderModal(ingredientArray)
  }
  
  return (
    <section className={`${styles.burgerConstructorContainer} pt-25 pl-4 pr-4`}>
      <div ref={dropRef} className={`${styles.burgerConstructorList} mb-10`}>
        {choosenBun && <BurgerConstructorItem item={choosenBun} isLocked openModal={openIngredientModal} isTop />}
          <ul className={`${styles.burgerConstructorScrollList} ${styles.scrollZone}`}>
            {ingredients && ingredients?.map((item, index) => {
              return (
                <li key={item.key}>
                  <BurgerConstructorItem item={item} openModal={openIngredientModal} />
                </li>
              )
            })}
          </ul>
        {choosenBun && <BurgerConstructorItem item={choosenBun} isLocked openModal={openIngredientModal} isBottom />}
      </div>
      <div className={`${styles.burgerConstructorPriceContainer} mt-10`}>
        <p className={`${styles.burgerConstructorPrice} text text_type_main-large`}>{orderPrice}<CurrencyIcon type="primary" /></p>
        <Button type="primary" size="medium" onClick={onSubmitBurger} >
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  openIngredientModal: PropTypes.func.isRequired,
  openOrderModal: PropTypes.func.isRequired,
}
