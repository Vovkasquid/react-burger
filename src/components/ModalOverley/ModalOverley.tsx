import React, { FC } from "react";
import styles from './ModalOverley.module.css'
import { TModalOverley } from '../../utils/types'

const ModalOverley: FC<TModalOverley> = ({ children, closePopup }) => {
  return (
    <>
      <section
        className={styles.modal}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closePopup()
          }
        }}
        >
          {children}
      </section>
    </>
  )
}

export default ModalOverley
