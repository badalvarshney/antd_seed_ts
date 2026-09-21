import type { RootState } from '../../app/store';

export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUser = (state: RootState) => state.auth.data;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthSuccessMessage = (state: RootState) => state.auth.successMessage;

export const selectLoginState = (state: RootState) => state.auth.loginState;
export const selectRegisterState = (state: RootState) => state.auth.registerState;
export const selectForgotPasswordState = (state: RootState) => state.auth.forgotPasswordState;
export const selectResetPasswordState = (state: RootState) => state.auth.resetPasswordState;
export const selectVerifyEmailState = (state: RootState) => state.auth.verifyEmailState;
