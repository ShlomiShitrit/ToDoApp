import {configureStore} from '@reduxjs/toolkit';
import UserReducer from './userSlice';
import LocaleReducer from './localeSlice';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    locale: LocaleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
