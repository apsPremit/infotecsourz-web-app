import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  time: 0,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload;
    },
    downTime: (state, action) => {
      state.time = state.time - 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTime, downTime } = timerSlice.actions;

export default timerSlice.reducer;
