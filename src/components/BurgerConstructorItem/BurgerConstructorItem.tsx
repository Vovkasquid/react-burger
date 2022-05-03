import React, { FC, useRef } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import styles from './BurgerConstructorItem.module.css'
import { useDispatch } from 'react-redux'
import { DELETE_CONSTRUCTOR_ITEM } from "../../services/actions/burgerConstructorIngredients";
import { DEC_COUNTER_INGREDIENT } from "../../services/actions/receivedComponents";
import { TBurgerConstructorItem, TDropIngredient, TIngredient } from "../../utils/types";

const BurgerConstructorItem: FC<TBurgerConstructorItem> = ({ item, isLocked, isTop, isBottom, index, moveIngredient }) => {
  const ref = useRef<any>(null)
  const dispatch = useDispatch()
  let itemName : string
  if (isTop) {
    itemName = item?.name + ' (верх)'
  } else if (isBottom) {
    itemName = item?.name + ' (низ)'
  } else {
    itemName = item?.name
  }
  const deleteElement = (item: TIngredient) => {
    // Сначала удаляем элемент из списка рендера
    dispatch({ type: DELETE_CONSTRUCTOR_ITEM, item })
    // Потом уменьшаем его количество в списке ингредиентов
    dispatch({ type: DEC_COUNTER_INGREDIENT, item })
  }

  const [, drop] = useDrop({
    accept: 'ingredient',
    hover: (item:TDropIngredient, monitor) => {
      if (!ref.current) {
        return;
      }
      if (index !== undefined) {
        const dragIndex = item?.index
        const hoverIndex = index
        // Если карточка на своём месте, то ничего не делаем
        if (dragIndex === hoverIndex) {
          return
        }
        // Тёмная магия из документация
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor?.getClientOffset();
        // Get pixels to the top
        // @ts-ignore
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        moveIngredient(dragIndex, hoverIndex);

        // Дока говорит, что мутировать плохо, но тут можно
        item.index = hoverIndex;
      }
    }
  })
  // Передаём в хук тип элемента и сам игредиент
  const [{ isDragging }, dragRef] = useDrag({
    // Контейнер не примет bun, поэтому точно огородимся от попыток его двигать
    type: isLocked ? 'bun' : 'ingredient',
    item: () => ({item, index}),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  },
)

  const opacity = isDragging ? 0 : 1
  dragRef(drop(ref))

  return (
    <div ref={isLocked ? null : ref} style={{opacity}} className={`${styles.BurgerConstructorItem}`} >
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

export default BurgerConstructorItem
