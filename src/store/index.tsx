import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { reducerPhotos } from '../reducers';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: [],
};

const reducer = combineReducers({
  reducerPhotos,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store, null);
