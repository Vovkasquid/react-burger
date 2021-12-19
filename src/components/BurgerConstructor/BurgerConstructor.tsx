import React from 'react'
import styles from './BurgerConstructor.module.css'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerConstructor({ mainIngrediets, openModal } : any) {
  return (
    <section className={`${styles.burgerConstructorContainer} pt-25 pl-4 pr-4`}>
      <ul className={`${styles.burgerConstructorList} mb-10`}>
          {mainIngrediets.map((item : any, index : any) => {
            return (
              <li key={index}>
                <BurgerConstructorItem item={item} index={index} length={mainIngrediets.length} openModal={openModal} />
              </li>
            )
          })}
      </ul>
      <div className={`${styles.burgerConstructorPriceContainer} mt-10`}>
        <p className={`${styles.burgerConstructorPrice} text text_type_main-large`}>625<CurrencyIcon type="primary" /></p>
        <Button type="primary" size="medium" onClick={() => openModal(null, true)} >
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}
