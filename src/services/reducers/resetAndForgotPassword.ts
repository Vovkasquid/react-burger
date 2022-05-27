import {
  CLEAR_STATE_FORGOT_PASSWORD, CLEAR_STATE_RESET_PASSWORD,
  POST_FORGOT_PASSWORD_FAILED,
  POST_FORGOT_PASSWORD_SUCCESS, POST_RESET_PASSWORD_FAILED, POST_RESET_PASSWORD_SUCCESS
} from '../actions/resetAndForgotPasswords'

type TInitialForgotAndResetPassword = {
  isSuccessForgotPasswordRequest: boolean;
  forgotPasswordRequestError: string;
  isSuccessResetPasswordRequest: boolean;
  resetPasswordRequestError: string;
}

interface IPostForgotPasswordRequest {
  readonly type: typeof POST_FORGOT_PASSWORD_SUCCESS;
}

interface IPostForgotPasswordFailed {
  readonly type: typeof POST_FORGOT_PASSWORD_FAILED;
  error: string;
}

interface IClearStateForgotPassword {
  readonly type: typeof CLEAR_STATE_FORGOT_PASSWORD;
}

interface IPostResetPasswordRequest {
  readonly type: typeof POST_RESET_PASSWORD_SUCCESS;
}

interface IPostResetPasswordFailed {
  readonly type: typeof POST_RESET_PASSWORD_FAILED;
  error: string;
}

interface IClearStateResetPassword {
  readonly type: typeof CLEAR_STATE_RESET_PASSWORD;
}

export type TResetAndForgotPasswordReducer = IPostForgotPasswordRequest |
  IPostForgotPasswordFailed |
  IClearStateForgotPassword |
  IPostResetPasswordRequest |
  IPostResetPasswordFailed |
  IClearStateResetPassword

const initialForgotAndResetPassword: TInitialForgotAndResetPassword = {
  isSuccessForgotPasswordRequest: false,
  forgotPasswordRequestError: '',
  isSuccessResetPasswordRequest: false,
  resetPasswordRequestError: '',
}

export const resetAndForgotPasswordReducer = (state = initialForgotAndResetPassword, action: TResetAndForgotPasswordReducer): TInitialForgotAndResetPassword => {
  switch (action.type) {
    case POST_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isSuccessForgotPasswordRequest: true,
        forgotPasswordRequestError: ''
      }
    }
    case POST_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        isSuccessForgotPasswordRequest: false,
        forgotPasswordRequestError: action.error,
      }
    }
    case CLEAR_STATE_FORGOT_PASSWORD: {
      return {
        ...state,
        isSuccessForgotPasswordRequest: false,
        forgotPasswordRequestError: '',
      }
    }
    case POST_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isSuccessResetPasswordRequest: true,
        resetPasswordRequestError: ''
      }
    }
    case POST_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        isSuccessResetPasswordRequest: false,
        resetPasswordRequestError: action.error,
      }
    }
    case CLEAR_STATE_RESET_PASSWORD: {
      return {
        ...state,
        isSuccessResetPasswordRequest: false,
        resetPasswordRequestError: '',
      }
    }
    default:
      return state
  }
}
