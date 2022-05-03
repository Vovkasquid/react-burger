import React, { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import styles from './MainPage.module.css'
import Modal from '../../components/Modal/Modal'
import OrderDetails from '../../components/OrderDetails/OrderDetails'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import { SET_DETAIL_INGREDIENT } from '../../services/actions/detailIngredient'
import { CLOSE_ORDER_MODAL, postOrder } from '../../services/actions/order'
import { TIngredient, TOrderState, TReceivedComponents, TRequestOrder } from "../../utils/types";

const MainPage: FC = () => {

  // Вытащим из хранилища данные о элементах с сервера и ошибках
  const {  getComponentsError } = useSelector((store:RootStateOrAny): TReceivedComponents => store.receivedComponents)
  // Вытащим из стора ошибки при POST с заказом
  // Вытащим стейт открытия и закрытия модалки
  const { orderError, isOrderModalVisible } = useSelector((store:RootStateOrAny): TOrderState => store.order)
  // Получаем диспатч
  const dispatch = useDispatch()

  const handleOpenIngredientModal = (currentIngredient: TIngredient) => {
    dispatch({ type: SET_DETAIL_INGREDIENT, ingredient: currentIngredient })
  }

  const handleOpenOrderModal = (req: TRequestOrder) => {
    // Делаем пост-запрос через экшен, который откроет модалку, если запрос успешен
    dispatch(postOrder(req))
  }

  const handleCloseOrderModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL })
  }

  return (
    <div className={styles.application} id="app">

      {isOrderModalVisible &&  <Modal
        closePopup={handleCloseOrderModal}
      >
        <OrderDetails />
      </Modal>}
      {getComponentsError &&
        <p className={`${styles.errorText} text text_type_main-default`}>
          {getComponentsError}
        </p>
      }
      {orderError &&
        <p className={`${styles.errorText} text text_type_main-default`}>
          {orderError}
        </p>
      }
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            openModal={handleOpenIngredientModal}
          />
          <BurgerConstructor
            openIngredientModal={handleOpenIngredientModal}
            openOrderModal={handleOpenOrderModal}
          />
        </DndProvider>
      </main>
    </div>
  )
}

export default MainPage
