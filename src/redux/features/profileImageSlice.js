import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  img: null,
};

export const profileImageSlice = createSlice({
  name: 'profileImage',
  initialState,
  reducers: {
    setProfileImage: (state, action) => {
      state.img = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfileImage } = profileImageSlice.actions;

export default profileImageSlice.reducer;
