import React from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerConstructorItem.module.css'

export default function BurgerConstructorItem({ item, index }:any) {
  console.log(item.name)
  return (
    <div className={`${styles.BurgerConstructorItem}`}>
      {index === 0 ? null : <DragIcon type="primary" />}
      <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} isLocked={index === 0 ? true : false} />
    </div>
  )
}

/* 
(
    <div className={`${styles.BurgerConstructorItem}`}>
      {index === 0 ? null : <DragIcon type="primary" />}
      <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} isLocked={!index}/>
    </div>
  )
*/