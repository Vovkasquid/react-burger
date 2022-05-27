import {
  CLEAR_EXIT_STATE,
  CLEAR_GET_STATE,
  CLEAR_LOGIN_STATE,
  CLEAR_PATCH_STATE,
  CLEAR_REGISTER_STATE,
  CLEAR_USER,
  DELETE_USER,
  EXIT_FAILED,
  GET_FAILED,
  LOGIN_FAILED,
  PATCH_FAILED,
  REGISTER_FAILED,
  SET_USER,
  USER_EXIT_SUCCESS,
  USER_GET_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_PATCH_SUCCESS,
  USER_REGISTER_SUCCESS
} from '../actions/user'

type TInitialUser = {
  email: string;
  name: string;
  isRegisterSuccess: boolean;
  registerError: string;
  isLoginSuccess: boolean;
  loginError: string;
  isExitSuccess: boolean;
  exitError: string;
  isGetSuccess: boolean;
  getError: string;
  isPatchSuccess: boolean;
  pathError: string;
}

interface IClearExitState {
  readonly type: typeof CLEAR_EXIT_STATE;
}

interface IClearGetState {
  readonly type: typeof CLEAR_GET_STATE;
}

interface IClearLoginState {
  readonly type: typeof CLEAR_LOGIN_STATE;
}

interface IClearPatchState {
  readonly type: typeof CLEAR_PATCH_STATE;
}

interface IClearRegisterState {
  readonly type: typeof CLEAR_REGISTER_STATE;
}

interface IClearUser {
  readonly type: typeof CLEAR_USER;
}

interface IDeleteUser {
  readonly type: typeof DELETE_USER;
}

interface IExitFailed {
  readonly type: typeof EXIT_FAILED;
  error: string;
}

interface IGetFailed {
  readonly type: typeof GET_FAILED;
  error: string;
}

interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
  error: string;
}

interface IPatchFailed {
  readonly type: typeof PATCH_FAILED;
  error: string;
}

interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
  error: string;
}

interface ISetUser {
  readonly type: typeof SET_USER;
  payload: { name: string, email: string };
}

interface IUserExitSuccess {
  readonly type: typeof USER_EXIT_SUCCESS;
}

interface IUserGetSuccess {
  readonly type: typeof USER_GET_SUCCESS;
}

interface IUserLoginSuccess {
  readonly type: typeof USER_LOGIN_SUCCESS;
}

interface IUserPatchSuccess {
  readonly type: typeof USER_PATCH_SUCCESS;
}

interface IUserRegisterSuccess {
  readonly type: typeof USER_REGISTER_SUCCESS;
}

export type TUserReducer = IClearExitState |
  IClearGetState |
  IClearLoginState |
  IClearPatchState |
  IClearRegisterState |
  IClearUser |
  IDeleteUser |
  IExitFailed |
  IGetFailed |
  ILoginFailed |
  IPatchFailed |
  IRegisterFailed |
  ISetUser |
  IUserExitSuccess |
  IUserGetSuccess |
  IUserLoginSuccess |
  IUserPatchSuccess |
  IUserRegisterSuccess

const initialUser: TInitialUser = {
  email: '',
  name: '',
  isRegisterSuccess: false,
  registerError: '',
  isLoginSuccess: false,
  loginError: '',
  isExitSuccess: false,
  exitError: '',
  isGetSuccess: false,
  getError: '',
  isPatchSuccess: false,
  pathError: '',
}

export const userReducer = (state = initialUser, action: TUserReducer):TInitialUser => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoginSuccess: true,
      }
    }
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        isRegisterSuccess: true,
      }
    }
    case USER_EXIT_SUCCESS: {
      return {
        ...state,
        isExitSuccess: true,
      }
    }
    case USER_GET_SUCCESS: {
      return {
        ...state,
        isGetSuccess: true,
      }
    }
    case USER_PATCH_SUCCESS: {
      return {
        ...state,
        isPatchSuccess: true,
      }
    }
    case SET_USER: {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      }
    }
    case DELETE_USER: {
      return {
        ...state,
        name: '',
        email: '',
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerError: action.error,
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginError: action.error,
      }
    }
    case EXIT_FAILED: {
      return {
        ...state,
        exitError: action.error,
      }
    }
    case GET_FAILED: {
      return {
        ...state,
        getError: action.error,
      }
    }
    case PATCH_FAILED: {
      return {
        ...state,
        pathError: action.error,
      }
    }
    case CLEAR_USER: {
      return {
        ...state,
        name: '',
        email: '',
      }
    }
    case CLEAR_REGISTER_STATE: {
      return {
        ...state,
        registerError: '',
        isRegisterSuccess: false,
      }
    }
    case CLEAR_LOGIN_STATE: {
      return {
        ...state,
        loginError: '',
        isLoginSuccess: false,
      }
    }
    case CLEAR_EXIT_STATE: {
      return {
        ...state,
        exitError: '',
        isExitSuccess: false,
      }
    }
    case CLEAR_GET_STATE: {
      return {
        ...state,
        getError: '',
        isGetSuccess: false,
      }
    }
    case CLEAR_PATCH_STATE: {
      return {
        ...state,
        pathError: '',
        isPatchSuccess: false,
      }
    }
    default:
      return state
  }
}
