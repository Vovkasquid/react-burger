import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import styles from './BurgerConstructorItem.module.css'
import { ingredientSchema } from '../../utils/schemas'
import { useDispatch } from 'react-redux'
import { DELETE_CONSTRUCTOR_ITEM } from "../../services/actions/burgerConstructorIngredients";

export default function BurgerConstructorItem({ item, openModal, isLocked, isTop, isBottom }) {
  const dispatch = useDispatch()
  let itemName = ''
  if (isTop) {
    itemName = item?.name + ' (верх)'
  } else if (isBottom) {
    itemName = item?.name + ' (низ)'
  } else {
    itemName = item?.name
  }
  const deleteElement = (item) => {
    dispatch({ type: DELETE_CONSTRUCTOR_ITEM, item })
  }
  /*
  // Передаём в хук тип элемента и сам игредиент
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: item,
  }) */

  return (
    <div className={`${styles.BurgerConstructorItem}`} >
      {!isLocked && <DragIcon type="primary" />}
      <ConstructorElement
        text={itemName}
        price={item?.price}
        thumbnail={item?.image}
        isLocked={isLocked}
        type={isTop ? 'top' : isBottom ? 'bottom' : undefined}
        handleClose={() => deleteElement(item)}
      />
    </div>
  )
}

BurgerConstructorItem.propTypes = {
  item: ingredientSchema,
  openModal: PropTypes.func.isRequired,
  isLocked: PropTypes.bool,
  isTop: PropTypes.bool,
  isBottom: PropTypes.bool,
}