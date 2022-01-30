import React from 'react'
import styles from './OrderDetails.module.css'
import succesIcon from '../../images/successIcon.svg'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const OrderDetails = ({ orderNumber }) => {
  
  return (
    <>
      <p className="text text_type_digits-large mb-8">{orderNumber}</p>
      <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
      <img src={succesIcon} className={`${styles.successImage} mb-15`} alt="изображение картинки успешного заказа" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired
}