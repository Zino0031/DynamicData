import { configureStore } from '@reduxjs/toolkit';
import dbConfigReducer from './dbConfigSlice';

const store = configureStore({
  reducer: {
    dbConfig: dbConfigReducer,
  },
});

export default store;
