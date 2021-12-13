import React from 'react'
import styles from './BurgerConstructor.module.css'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import data from '../../utils/data'

export default function BurgerConstructor() {
  return (
    <section className={`${styles.burgerConstructorContainer} pt-25 pl-4 pr-4`}>
      <ul className={`${styles.burgerConstructorList}`}>
          {data.map((item, index) => {
            return (
              <li key={index}>
                <BurgerConstructorItem item={item} />
              </li>
            )
          })}
      </ul>
    </section>
  )
}