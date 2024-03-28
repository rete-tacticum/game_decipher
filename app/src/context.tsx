import React, { createContext, useReducer, useContext } from 'react';
import decipherGameReducer from './reducers/DecipherGameReducer/index';

const AppContext = createContext({});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(decipherGameReducer, {});

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export {
  AppProvider,
  useAppContext,
}