import React from 'react'
import styles from './Modal.module.css'
import ModalOverley from '../ModalOverley/ModalOverley.jsx'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import succesIcon from '../../images/successIcon.svg'
import ReactDOM from 'react-dom'
import ModalOrderItem from '../ModalOrderItem/ModalOrderItem'
import ModalIngredientItem from '../ModalIngredientItem/ModalIngredientItem'

const modalRoot = document.getElementById('modal')

const Modal = ( { isModalVisible, closePopup, ingredient, isOrder } ) => {
  const listenEscHandler = (event) => {
    if (event.key === 'Escape') {
      closePopup()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', listenEscHandler)
    return  () => document.removeEventListener('keydown', listenEscHandler)
  }, [])
  
  return ReactDOM.createPortal(
    <ModalOverley isModalVisible={isModalVisible} closePopup={closePopup} >
      {isOrder
      ?
      <ModalOrderItem closePopup={closePopup} />
      :
      <ModalIngredientItem closePopup={closePopup} ingredient={ingredient} />
      }
    </ModalOverley>
  , modalRoot)
}

export default Modal