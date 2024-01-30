import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import logger from 'redux-logger';

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
  reducer: contactsReducer,
  middleware,
});

export default store;
