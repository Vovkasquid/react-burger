import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerConstructorItem.module.css'
import { ingredientSchema } from '../../utils/schemas'

export default function BurgerConstructorItem({ item, openModal, isLocked, isTop, isBottom }) {
  let itemName = ''
  if (isTop) {
    itemName = item?.name + ' (верх)'
  } else if (isBottom) {
    itemName = item?.name + ' (низ)'
  } else {
    itemName = item?.name
  }
  return (
    <div className={`${styles.BurgerConstructorItem}`} onClick={() => openModal(item)} >
      {!isLocked && <DragIcon type="primary" />}
      <ConstructorElement 
        text={itemName}
        price={item?.price}
        thumbnail={item?.image}
        isLocked={isLocked}
        type={isTop ? 'top' : isBottom ? 'bottom' : undefined}
      />
    </div>
  )
}

BurgerConstructorItem.propTypes = {
  item: ingredientSchema.isRequired,
  openModal: PropTypes.func.isRequired,
  isLocked: PropTypes.bool,
  isTop: PropTypes.bool,
  isBottom: PropTypes.bool,
}