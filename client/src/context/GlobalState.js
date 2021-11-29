import React, { createContext, useReducer } from 'react';
import { GlobalReducer } from '../reducers/GlobalReducer';

// Initial state
const initialState = {
    platforms: [],
    dailyChallenge: null
};

// Create context
export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    async function getPlatforms() {

    };

    async function getDailyChallenge() {

    };

    return (<GlobalContext.Provider value={{
        // error: { msg: state.msg, status: state.status, id: state.id },
        // returnErrors,
        // clearErrors
        getPlatforms,
        getDailyChallenge,
    }}>
        {children}
    </GlobalContext.Provider>);

};