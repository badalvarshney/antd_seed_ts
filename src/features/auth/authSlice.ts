import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { message } from '../../utils/antdMessage';
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '../../utils';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role?: string;
  [key: string]: any;
}

export interface SubAuthState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export interface AuthState {
  data: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loader: boolean;
  error: string | null;
  successMessage: string | null;
  loginState: SubAuthState;
  registerState: SubAuthState;
  forgotPasswordState: SubAuthState;
  resetPasswordState: SubAuthState;
  verifyEmailState: SubAuthState;
}

const initialSubState: SubAuthState = {
  isLoading: false,
  error: null,
  success: false,
};

const initialState: AuthState = {
  data: getUser<User>(),
  token: getToken(),
  isAuthenticated: Boolean(getToken()),
  isLoading: false,
  loader: false,
  error: null,
  successMessage: null,
  loginState: { ...initialSubState },
  registerState: { ...initialSubState },
  forgotPasswordState: { ...initialSubState },
  resetPasswordState: { ...initialSubState },
  verifyEmailState: { ...initialSubState },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<User | null>) => {
      state.data = action.payload;
    },
    setTokenState: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload;
    },
    setLoginState: (state, action: PayloadAction<Partial<SubAuthState>>) => {
      state.loginState = { ...state.loginState, ...action.payload };
    },
    setRegisterState: (state, action: PayloadAction<Partial<SubAuthState>>) => {
      state.registerState = { ...state.registerState, ...action.payload };
    },
    setForgotPasswordState: (state, action: PayloadAction<Partial<SubAuthState>>) => {
      state.forgotPasswordState = { ...state.forgotPasswordState, ...action.payload };
    },
    setResetPasswordState: (state, action: PayloadAction<Partial<SubAuthState>>) => {
      state.resetPasswordState = { ...state.resetPasswordState, ...action.payload };
    },
    setVerifyEmailState: (state, action: PayloadAction<Partial<SubAuthState>>) => {
      state.verifyEmailState = { ...state.verifyEmailState, ...action.payload };
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
      state.loginState.error = null;
      state.registerState.error = null;
      state.forgotPasswordState.error = null;
      state.resetPasswordState.error = null;
      state.verifyEmailState.error = null;
    },
    logout: (state) => {
      state.data = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.successMessage = null;
      state.loginState = { ...initialSubState };
      state.registerState = { ...initialSubState };
      state.forgotPasswordState = { ...initialSubState };
      state.resetPasswordState = { ...initialSubState };
      state.verifyEmailState = { ...initialSubState };
      removeToken();
      removeUser();
    },
  },
});

export const {
  setData,
  setTokenState,
  setLoading,
  setLoader,
  setError,
  setSuccessMessage,
  setLoginState,
  setRegisterState,
  setForgotPasswordState,
  setResetPasswordState,
  setVerifyEmailState,
  clearMessages,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

// Async API Thunks

export const loginUser = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setLoginState({ isLoading: true, error: null, success: false }));

    const res = await axios.post('auth/login', payload);

    if (res?.data?.success) {
      const userData = res?.data?.data?.user;
      const userToken = res?.data?.data?.token;

      setUser(userData);
      setToken(userToken);

      dispatch(setData(userData));
      dispatch(setTokenState(userToken));
      dispatch(setLoginState({ isLoading: false, success: true }));
      message.success(res?.data?.message || 'Login successful!');
      return { success: true, data: res?.data?.data };
    }
  } catch (e: any) {
    const errorMsg = e?.response?.data?.message || 'Invalid email or password';
    dispatch(setError(errorMsg));
    dispatch(setLoginState({ isLoading: false, error: errorMsg }));
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerUser = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setRegisterState({ isLoading: true, error: null, success: false }));

    const res = await axios.post('auth/register', payload);

    if (res?.data?.success) {
      const userData = res?.data?.data?.user;
      const userToken = res?.data?.data?.token;

      if (userToken) {
        setUser(userData);
        setToken(userToken);
        dispatch(setData(userData));
        dispatch(setTokenState(userToken));
      }

      dispatch(setRegisterState({ isLoading: false, success: true }));
      message.success(res?.data?.message || 'Registration successful!');
      return { success: true, data: res?.data?.data };
    }
  } catch (e: any) {
    const errorMsg = e?.response?.data?.message || 'Registration failed';
    dispatch(setError(errorMsg));
    dispatch(setRegisterState({ isLoading: false, error: errorMsg }));
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  } finally {
    dispatch(setLoading(false));
  }
};

export const forgotPassword = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setForgotPasswordState({ isLoading: true, error: null, success: false }));

    const res = await axios.post('auth/forgot-password', payload);

    if (res?.data?.success) {
      dispatch(setSuccessMessage(res?.data?.message));
      dispatch(setForgotPasswordState({ isLoading: false, success: true }));
      message.success(res?.data?.message || 'Password reset link sent');
      return { success: true };
    }
  } catch (e: any) {
    const errorMsg = e?.response?.data?.message || 'Failed to send reset link';
    dispatch(setError(errorMsg));
    dispatch(setForgotPasswordState({ isLoading: false, error: errorMsg }));
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  } finally {
    dispatch(setLoading(false));
  }
};

export const resetPassword = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setResetPasswordState({ isLoading: true, error: null, success: false }));

    const res = await axios.post('auth/reset-password', payload);

    if (res?.data?.success) {
      dispatch(setSuccessMessage(res?.data?.message));
      dispatch(setResetPasswordState({ isLoading: false, success: true }));
      message.success(res?.data?.message || 'Password reset successful');
      return { success: true };
    }
  } catch (e: any) {
    const errorMsg = e?.response?.data?.message || 'Password reset failed';
    dispatch(setError(errorMsg));
    dispatch(setResetPasswordState({ isLoading: false, error: errorMsg }));
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  } finally {
    dispatch(setLoading(false));
  }
};

export const verifyEmail = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setVerifyEmailState({ isLoading: true, error: null, success: false }));

    const res = await axios.post('auth/verify-email', payload);

    if (res?.data?.success) {
      dispatch(setSuccessMessage(res?.data?.message));
      dispatch(setVerifyEmailState({ isLoading: false, success: true }));
      message.success(res?.data?.message || 'Email verified successfully!');
      return { success: true };
    }
  } catch (e: any) {
    const errorMsg = e?.response?.data?.message || 'Email verification failed';
    dispatch(setError(errorMsg));
    dispatch(setVerifyEmailState({ isLoading: false, error: errorMsg }));
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  } finally {
    dispatch(setLoading(false));
  }
};

export const resendVerificationCode = (payload?: any) => async (dispatch: any) => {
  try {
    const res = await axios.post('auth/resend-verification', payload);
    if (res?.data?.success) {
      message.success(res?.data?.message || 'A new 6-digit verification code has been sent to your email!');
      return { success: true };
    }
  } catch (e: any) {
    const errorMsg = e?.response?.data?.message || 'Failed to resend verification code';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const getCurrentUser = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));

    const res = await axios.get('auth/me');

    if (res?.data?.success) {
      const userData = res?.data?.data?.user;
      setUser(userData);
      dispatch(setData(userData));
      return { success: true, data: userData };
    }
  } catch (e: any) {
    console.log(e);
    dispatch(logout());
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => (dispatch: any) => {
  dispatch(logout());
  message.info('Logged out successfully');
};
