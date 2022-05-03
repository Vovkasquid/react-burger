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

export interface HistoryWithFrom extends History {
  from: {
    pathname: string;
  }
}
