import React from 'react'
import styles from './BurgerConstructor.module.css'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerConstructor({ mainIngrediets, openModal, choosenBun } : any) {
  return (
    <section className={`${styles.burgerConstructorContainer} pt-25 pl-4 pr-4`}>
      <div className={`${styles.burgerConstructorList} mb-10`}>
          <BurgerConstructorItem item={choosenBun} isLocked openModal={openModal} isTop/>
          <ul className={`${styles.burgerConstructorScrollList} ${styles.scrollZone}`}>
            {mainIngrediets.map((item : any, index : any) => {
              return (
                <li key={index}>
                  <BurgerConstructorItem item={item} openModal={openModal} />
                </li>
              )
            })}
          </ul>
          <BurgerConstructorItem item={choosenBun} isLocked openModal={openModal} isBottom />
      </div>
      <div className={`${styles.burgerConstructorPriceContainer} mt-10`}>
        <p className={`${styles.burgerConstructorPrice} text text_type_main-large`}>625<CurrencyIcon type="primary" /></p>
        <Button type="primary" size="medium" onClick={() => openModal(null, true)} >
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}
