import React, { useRef } from "react";
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import styles from './BurgerConstructorItem.module.css'
import { ingredientSchema } from '../../utils/schemas'
import { useDispatch } from 'react-redux'
import { DELETE_CONSTRUCTOR_ITEM } from "../../services/actions/burgerConstructorIngredients";
import { DEC_COUNTER_INGREDIENT } from "../../services/actions/receivedComponents";

export default function BurgerConstructorItem({ item, isLocked, isTop, isBottom, index }) {
  const ref = useRef(null)
  const dispatch = useDispatch()
  let itemName = ''
  if (isTop) {
    itemName = item?.name + ' (верх)'
  } else if (isBottom) {
    itemName = item?.name + ' (низ)'
  } else {
    itemName = item?.name
  }
  const deleteElement = (item) => {
    // Сначала удаляем элемент из списка рендера
    dispatch({ type: DELETE_CONSTRUCTOR_ITEM, item })
    // Потом уменьшаем его количество в списке ингредиентов
    dispatch({ type: DEC_COUNTER_INGREDIENT, item })
  }

  // Передаём в хук тип элемента и сам игредиент
  const [{ isDragging }, dragRef] = useDrag({
    // Контейнер не примет bun, поэтому точно огородимся от попыток его двигать
    type: isLocked ? 'bun' : 'ingredient',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  },
)

  const opacity = isDragging ? 0 : 1
  // dragRef(drop(ref))

  return (
    <div ref={dragRef} style={{opacity}} className={`${styles.BurgerConstructorItem}`} >
      {!isLocked && <DragIcon type="primary" />}
      <ConstructorElement
        text={itemName}
        price={item?.price}
        thumbnail={item?.image}
        isLocked={isLocked}
        type={isTop ? 'top' : isBottom ? 'bottom' : undefined}
        handleClose={() => deleteElement(item)}
      />
    </div>
  )
}

BurgerConstructorItem.propTypes = {
  item: ingredientSchema,
  isLocked: PropTypes.bool,
  isTop: PropTypes.bool,
  isBottom: PropTypes.bool,
  index: PropTypes.number,
}