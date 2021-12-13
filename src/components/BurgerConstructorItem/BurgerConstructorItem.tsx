import React from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerConstructorItem.module.css'

export default function BurgerConstructorItem({ item }:any) {
  return (
    <div className={`${styles.BurgerConstructorItem}`}>
      <DragIcon type="primary" />
      <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
    </div>
  )
}

