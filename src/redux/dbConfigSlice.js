import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hostname: '',
  username: '',
  password: '',
  database: '',
};

export const dbConfigSlice = createSlice({
  name: 'dbConfig',
  initialState,
  reducers: {
    setDBConfig: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setDBConfig } = dbConfigSlice.actions;

export default dbConfigSlice.reducer;
