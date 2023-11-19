import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    loggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.id;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.loggedIn = true;
    },
    logout: state => {
      state.userId = 0;
      state.email = '';
      state.password = '';
      state.firstName = '';
      state.lastName = '';
      state.loggedIn = false;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
