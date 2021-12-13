import React from 'react'
import styles from './BurgerConstructor.module.css'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import data from '../../utils/data'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerConstructor() {
  return (
    <section className={`${styles.burgerConstructorContainer} pt-25 pl-4 pr-4`}>
      <ul className={`${styles.burgerConstructorList} mb-10`}>
          {data.map((item, index) => {
            return (
              <li key={index}>
                <BurgerConstructorItem item={item} />
              </li>
            )
          })}
      </ul>
      <div className={`${styles.burgerConstructorPriceContainer} mt-10`}>
        <p className={`${styles.burgerConstructorPrice} text text_type_main-large`}>625<CurrencyIcon type="primary" /></p>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}