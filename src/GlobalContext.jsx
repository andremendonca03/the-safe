import React from "react";
import useLocalStorage from './hooks/useLocalStorage';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  

  return (
    <GlobalContext.Provider value={{useLocalStorage}}>
      {children}
    </GlobalContext.Provider>
  )
};
