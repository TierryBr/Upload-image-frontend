import { createSlice } from '@reduxjs/toolkit';

const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    photos: [],
  },
  reducers: {
    addPhoto: (state, action) => {
      state.photos = state.photos.concat(action.payload);
    },
  },
});

export const reducerPhotos = photosSlice.reducer;

export const { addPhoto } = photosSlice.actions;
