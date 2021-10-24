// import React, { createContext, useReducer } from 'react';
// import { GlobalReducer } from '../reducers/GlobalReducer';

// Initial state
// const initialState = {
//   quizzes: [],
//   error: null,
//   loading: true
// };

// Create context
// export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(GlobalReducer, initialState);

  // return (<GlobalContext.Provider value={{
  //   quizzes: state.quizzes,
  //   error: state.error,
  //   loading: state.loading,
  //   getQuizzes,
  //   addQuiz,
  //   deleteQuiz
  // }}>
  //   {children}
  // </GlobalContext.Provider>);
  return null;
};