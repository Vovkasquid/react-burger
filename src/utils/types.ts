import { ReactNode } from 'react'

export type TUserState = {
  email: string;
  name: string;
  isRegisterSuccess: boolean;
  registerError: string | undefined;
  isLoginSuccess: boolean;
  loginError: string | undefined;
  isExitSuccess: boolean;
  exitError: string | undefined;
  isGetSuccess: boolean;
  getError: string | undefined;
  isPatchSuccess: boolean;
  pathError: string | undefined;
}

export type TAuthState = {
  isSuccessForgotPasswordRequest: boolean;
  forgotPasswordRequestError: string | undefined;
  isSuccessResetPasswordRequest: boolean;
  resetPasswordRequestError: string | undefined;
}

export interface HistoryWithFrom extends History {
  from: {
    pathname: string;
  }
  haveCode: boolean;
}

export type TAuthForm = {
  onSubmit: () => void;
  title: string;
  buttonTitle: string;
  children?: ReactNode;
}

type TIngredient = {
  count?: number,
  index?: number,
  key?: string,
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
}

export type TReceivedComponents = {
  receivedComponents: Array<TIngredient> | undefined;
  getComponentsError: string | undefined;
  bun: Array<TIngredient> | undefined;
  sauces: Array<TIngredient> | undefined;
  mainIngredients: Array<TIngredient> | undefined;
}

export type TDetailIngredient = {
  ingredient: TIngredient,
}

export type TRequest = {
  name?: string;
  email?: string;
  password?: string;
}