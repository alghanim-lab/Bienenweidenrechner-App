import React, { createContext, useReducer, useContext, useEffect } from "react";
import { BluehstreifenReducer, initialState } from "./BluehstreifenReducer";
import { loadPflanzenarten } from "./Container";


// Erstelle  ein Context-Objekt
const StateContext = createContext();

const DispatchContext = createContext();

export const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(BluehstreifenReducer, initialState);

  useEffect(() => {
    loadPflanzenarten(dispatch);
  }, []);

  return (
  <DispatchContext.Provider value={dispatch}>
    <StateContext.Provider value={state}>
        {children}
    </StateContext.Provider>
  </DispatchContext.Provider>
  );
};

export const useStateContext = () => useContext (StateContext)
export const useDispatchContext = () => useContext (DispatchContext)



