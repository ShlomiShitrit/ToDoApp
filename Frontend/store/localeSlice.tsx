import {createSlice} from '@reduxjs/toolkit';

export const localeSlice = createSlice({
  name: 'locale',
  initialState: {lang: 'he', dir: 'rtl'},
  reducers: {
    setLocaleToEn: state => {
      state.lang = 'en';
      state.dir = 'ltr';
    },
    setLocaleToHe: state => {
      state.lang = 'he';
      state.dir = 'rtl';
    },
  },
});

export const localeAction = localeSlice.actions;

export default localeSlice.reducer;
