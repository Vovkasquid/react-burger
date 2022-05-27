import {
  DEC_COUNTER_INGREDIENT,
  GET_COMPONENTS_FAILED,
  GET_COMPONENTS_SUCCESS, INC_COUNTER_INGREDIENT,
  SET_FILTERED_BUN, SET_FILTERED_MAIN_INGREDIENTS,
  SET_FILTERED_SAUCES
} from '../actions/receivedComponents'
import { TIngredient } from "../../utils/types";

type TInitialReceivedComponents = {
  receivedComponents: Array<TIngredient> | [];
  getComponentsError: string;
  bun: Array<TIngredient> | [];
  sauces: Array<TIngredient> | [];
  mainIngredients: Array<TIngredient> | [];
}

interface IGetComponentSuccess {
  readonly type:  typeof GET_COMPONENTS_SUCCESS;
  components: Array<TIngredient>;
}

interface  IGetComponentFailed {
  readonly type: typeof GET_COMPONENTS_FAILED;
  error: string;
}

interface ISetFilteredBun {
  readonly  type: typeof SET_FILTERED_BUN;
  filtered: Array<TIngredient>;
}

interface ISetFilteredSauces {
  readonly type: typeof SET_FILTERED_SAUCES;
  filtered: Array<TIngredient>;
}

interface ISetFilteredMainIngredient {
  readonly type: typeof SET_FILTERED_MAIN_INGREDIENTS;
  filtered: Array<TIngredient>;
}

interface IIncCounterIngredient {
  readonly type: typeof INC_COUNTER_INGREDIENT;
  item: TIngredient;
}

interface IDecCounterIngredient {
  readonly type: typeof DEC_COUNTER_INGREDIENT;
  item: TIngredient;
}

type TReceivedComponentsReducer = IGetComponentSuccess |
  IGetComponentFailed |
  ISetFilteredBun |
  ISetFilteredSauces |
  ISetFilteredMainIngredient |
  IIncCounterIngredient |
  IDecCounterIngredient

const initialReceivedComponents: TInitialReceivedComponents = {
  receivedComponents: [],
  getComponentsError: '',
  bun: [],
  sauces: [],
  mainIngredients: [],
}

export const receivedComponentsReducer = (state = initialReceivedComponents, action: TReceivedComponentsReducer): TInitialReceivedComponents => {
  switch(action.type) {
    case GET_COMPONENTS_SUCCESS: {
      // Если запрос прошёл успешно, то заполним стейт и затрём ошибку
      // Иначе выставим ошибку
      return {
        ...state,
        receivedComponents: action.components,
        getComponentsError: '',
      }
    }
    case GET_COMPONENTS_FAILED: {
      return {
        ...state,
        getComponentsError: action.error,
      }
    }
    // Обработаем экшены записи отфильтрованных элементов
    case SET_FILTERED_BUN: {
      return {
        ...state,
        bun: action.filtered,
      }
    }
    case SET_FILTERED_SAUCES: {
      return {
        ...state,
        sauces: action.filtered,
      }
    }
    case SET_FILTERED_MAIN_INGREDIENTS: {
      return {
        ...state,
        mainIngredients: action.filtered,
      }
    }
    case INC_COUNTER_INGREDIENT: {
      let indexOfIngredient
      const newState: TInitialReceivedComponents  = {...state}
      if (action.item.type === 'bun') {
        indexOfIngredient = state.bun.findIndex(item => item._id === action.item._id)
        // Булок может быть ли 2, либо 0
        if (newState.bun[indexOfIngredient].counter === 0) {
          // Cначала занулим все остальные булки, а потом выставим нужную
          newState.bun.forEach(item => item.counter = 0)
          // @ts-ignore
          newState.bun[indexOfIngredient].counter += 2;
        } // В зависимости от типа ищем элемент в нужном массиве
      } else if (action.item.type === 'sauce') {
        indexOfIngredient = state.sauces.findIndex(item => item._id === action.item._id)
        // @ts-ignore
        newState.sauces[indexOfIngredient].counter += 1
      } else {
        indexOfIngredient = state.mainIngredients.findIndex(item => item._id === action.item._id)
        // @ts-ignore
        newState.mainIngredients[indexOfIngredient].counter += 1
      }

      return newState
    }
    case DEC_COUNTER_INGREDIENT: {
      let indexOfIngredient
      const newState: TInitialReceivedComponents = {...state}
      // Булки тут вообще не трогаем
      if (action.item.type === 'sauce') {
        indexOfIngredient = state.sauces.findIndex(item => item._id === action.item._id)
        // @ts-ignore
        newState.sauces[indexOfIngredient].counter -= 1
      } else {
        indexOfIngredient = state.mainIngredients.findIndex(item => item._id === action.item._id)
        // @ts-ignore
        newState.mainIngredients[indexOfIngredient].counter -= 1
      }
      return newState
    }
    default: {
      return state
    }
  }
}
