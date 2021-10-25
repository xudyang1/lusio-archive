import React, { createContext, useReducer } from 'react';
// import { GlobalReducer } from '../reducers/GlobalReducer';
// import { GET_ERRORS, CLEAR_ERRORS } from '../types/actionTypes';

// Initial state
// const initialState = {
//   errors: []
// };

// Create context
export const GlobalContext = createContext(/*initialState*/);
export const GlobalProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(GlobalReducer, initialState);

  // const returnErrors = (msg, status, id = null) => {
  //   return dispatch({
  //     type: GET_ERRORS,
  //     payload: { msg, status, id }
  //   });
  // };

  // // clear errors
  // const clearErrors = () => {
  //   return dispatch({
  //     type: CLEAR_ERRORS
  //   });
  // };

  return (<GlobalContext.Provider value={{
    // error: { msg: state.msg, status: state.status, id: state.id },
    // returnErrors,
    // clearErrors
  }}>
    {children}
  </GlobalContext.Provider>);
 
};