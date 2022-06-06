import { TypedUseSelectorHook, useDispatch as dispatchHook,  useSelector as selectorHook } from 'react-redux'
import type { RootState, AppDispatch, AppThunk } from '../index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>()
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook
