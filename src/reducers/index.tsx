import { createSlice } from '@reduxjs/toolkit';

const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    photos: [],
  },
  reducers: {
    addPhoto: (state, action) => {
      state.photos = [];
    },
    editProgressPhoto: (state, action) => {
      state.photos = handleEditProgressPhoto(action.payload, state.photos);
    },
  },
});

const handleEditProgressPhoto = (item, photos) => {
  console.log('item', item);
  console.log('photos', photos);
  if (item.file.id === photos[0].id) {
    console.log('entrou no if');
    return { ...item.file, ...item.data };
  } else return photos;
};

export const reducerPhotos = photosSlice.reducer;

export const { addPhoto, editProgressPhoto } = photosSlice.actions;
