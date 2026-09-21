import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customizationReducer from '../features/customization/customizationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customization: customizationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
