import React from 'react'
import PropTypes from 'prop-types'
import styles from './ModalOverley.module.css'

export default function ModalOverley ({ children, closePopup }) {
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

ModalOverley.propTypes = {
  closePopup: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}