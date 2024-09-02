import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './features/timeSlice';
import baseApi from './baseApi';
import profileImageReducer from './features/profileImageSlice';

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    profileImage: profileImageReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
