import React from 'react'
import styles from './OrderDetails.module.css'
import successIcon from '../../images/successIcon.svg'
import { RootStateOrAny, useSelector } from "react-redux";
import { TOrderState } from "../../utils/types";

const OrderDetails = () => {
  // TO DO пофиксить эту дичь внизу
  const orderNumber = useSelector((state:RootStateOrAny):TOrderState => state?.order?.order?.order?.number)
  return (
    <>
      <p className="text text_type_digits-large mb-8">{orderNumber}</p>
      <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
      <img src={successIcon} className={`${styles.successImage} mb-15`} alt="изображение картинки успешного заказа" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails
