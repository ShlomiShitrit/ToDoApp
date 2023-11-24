import {createSlice} from '@reduxjs/toolkit';
import {UserSliceState} from '../general/interfaces';
import {EMPTY_USER} from '../general/resources';

const initialState: UserSliceState = {
  userInfo: EMPTY_USER,
  loggedIn: false,
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    logout: state => {
      state.userInfo = EMPTY_USER;
      state.token = '';
      state.loggedIn = false;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
