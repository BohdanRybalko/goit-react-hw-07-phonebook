import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from '../redux/contactsSlice';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

const ignoreActions = ['FLUSH', 'REHYDRATE', 'PAUSE', 'PERSIST', 'PURGE', 'REGISTER'];

const middleware = (getDefaultMiddleware) => {
  const middlewares = getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ignoreActions.map((actionType) => `persist/${actionType}`),
    },
  });

 
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  return middlewares;
};

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);

export default store;
