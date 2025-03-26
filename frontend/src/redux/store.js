
import { configureStore } from '@reduxjs/toolkit'
// import notesReducer from './counter/notesSlice' // ✅ Make sure this file exists
import { notesSlice } from './counter/counterSlice';

export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer, // ✅ Use correct reducer name
  },
});
