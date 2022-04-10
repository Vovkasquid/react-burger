import {
  CLEAR_STATE_FORGOT_PASSWORD, CLEAR_STATE_RESET_PASSWORD,
  POST_FORGOT_PASSWORD_FAILED,
  POST_FORGOT_PASSWORD_SUCCESS, POST_RESET_PASSWORD_FAILED, POST_RESET_PASSWORD_SUCCESS
} from '../actions/resetAndForgotPasswords'

const initialForgotAndResetPassword = {
  isSuccessForgotPasswordRequest: false,
  forgotPasswordRequestError: '',
  isSuccessResetPasswordRequest: false,
  resetPasswordRequestError: '',
}

export const resetAndForgotPasswordReducer = (state = initialForgotAndResetPassword, action) => {
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
