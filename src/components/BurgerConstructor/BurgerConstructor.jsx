import React from 'react'
import PropTypes from 'prop-types'
import styles from './BurgerConstructor.module.css'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem.jsx'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd'
import { v4 as generateUniqueId } from 'uuid'
import { ADD_CONSTRUCTOR_ITEM, SET_CHOOSEN_BUN } from '../../services/actions/burgerConstructorIngredients';
import { INC_COUNTER_INGREDIENT, SET_SORTED_ARRAY } from "../../services/actions/receivedComponents";
import { getCookie } from '../../utils/coockies'

export default function BurgerConstructor({ openIngredientModal, openOrderModal }) {
  // Вытаскиваем из стора полученные компоненты и отфильтровываем нужные
  const  { ingredients, choosenBun } = useSelector(store => store.constructorItems)
  const dispatch = useDispatch()

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      const { item } = ingredient
      // TO DO вынести в функцию
      if (item) {
        if (item.type === 'bun') {
          dispatch({ type: SET_CHOOSEN_BUN, bun: item })
          dispatch({ type: INC_COUNTER_INGREDIENT, item: item })
        } else if (!item.key) {
          // Если у ингредиента нет поля key, значит он здесь новичок и его надо добавить в массив на рендер
          // иначе его не надо дважды плодить
          dispatch({ type: ADD_CONSTRUCTOR_ITEM, ingredient: item, key: generateUniqueId() })
          dispatch({ type: INC_COUNTER_INGREDIENT, item: item })
        }
      } else {
        if (ingredient.type === 'bun') {
          dispatch({ type: SET_CHOOSEN_BUN, bun: ingredient })
          dispatch({ type: INC_COUNTER_INGREDIENT, item: ingredient })
        } else if (!ingredient.key) {
          // Если у ингредиента нет поля key, значит он здесь новичок и его надо добавить в массив на рендер
          // иначе его не надо дважды плодить
          dispatch({ type: ADD_CONSTRUCTOR_ITEM, ingredient: ingredient, key: generateUniqueId() })
          dispatch({ type: INC_COUNTER_INGREDIENT, item: ingredient })
        }
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
    const ingredientArray = ingredients?.map(item => item._id)
    openOrderModal(ingredientArray)
  }

  const moveIngredient = (dragIndex, hoverIndex) => {
    // Вытаскиваем из массива карточку, которую будем вставлять
    const dragIngredient = ingredients[dragIndex]
    // Защита от булок
    if (dragIngredient) {
      // Делаем новый массив, который будем мутировать
      const newIngredients = [...ingredients]
      // Убираем из массива элемент со старым индексом
      newIngredients.splice(dragIndex, 1)
      // Добавляем в массив элемент с новым индексом
      newIngredients.splice(hoverIndex, 0, dragIngredient)
      // Добавляем отсортированный массив на рендер
      dispatch({ type: SET_SORTED_ARRAY, sortedArray: newIngredients })
    }
  }
  
  return (
    <section className={`${styles.burgerConstructorContainer} pt-25 pl-4 pr-4`}>
      <div ref={dropRef} className={`${styles.burgerConstructorList} mb-10`}>
        {choosenBun && <BurgerConstructorItem item={choosenBun} isLocked openModal={openIngredientModal}  moveIngredient={moveIngredient} isTop />}
          <ul className={`${styles.burgerConstructorScrollList} ${styles.scrollZone}`}>
            {ingredients && ingredients?.map((item, index) => {
              return (
                <li key={item.key}>
                  <BurgerConstructorItem item={item} openModal={openIngredientModal} index={index} moveIngredient={moveIngredient} />
                </li>
              )
            })}
          </ul>
        {choosenBun && <BurgerConstructorItem item={choosenBun} isLocked openModal={openIngredientModal} moveIngredient={moveIngredient} isBottom />}
      </div>
      <div className={`${styles.burgerConstructorPriceContainer} mt-10`}>
        <p className={`${styles.burgerConstructorPrice} text text_type_main-large`}>{orderPrice}<CurrencyIcon type="primary" /></p>
        <Button disabled={!getCookie('token')} type="primary" size="medium" onClick={onSubmitBurger} >
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
