// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import authReducer from './reducers/authSlice'; // Importer votre slice d'authentification

// Configuration pour redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Combiner les reducers (authReducer est un exemple)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Créer un reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Créer le store Redux avec middleware thunk
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

// Exporter le persistor
export const persistor = persistStore(store);

// Définir RootState et AppDispatch pour un typage plus sûr
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
