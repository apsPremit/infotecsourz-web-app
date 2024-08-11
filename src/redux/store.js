import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './features/timeSlice';
import baseApi from './baseApi';
export const store = configureStore({
  reducer: {
    timer: timerReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
