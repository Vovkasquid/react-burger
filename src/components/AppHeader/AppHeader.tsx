import React from 'react'
import styles from './AppHeader.module.css'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  )
}