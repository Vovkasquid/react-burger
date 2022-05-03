import { ReactNode } from 'react'

export type TUserState = {
  mail: string;
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
