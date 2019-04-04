//this is the magic

import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();
// allows us to create Context objects to create providers and consumers
// StateProvider lets us hold the context object StateContext
// the .Provider provides us w/ state, lets us consume components, change state, and pass changes to children
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
//exports a hook giving access to StateContext(reducers, state)
export const useStateValue = () => useContext(StateContext);
