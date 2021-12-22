import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styles from './ModalOverley.module.css'


export default function ModalOverley ({ children, isModalVisible, closePopup}) {
  return (
    <>
      <section
        className={isModalVisible ?
        `${styles.modal} ${styles.modalActive}` :
        styles.modal }
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