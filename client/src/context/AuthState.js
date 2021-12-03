import React, { createContext, useReducer } from 'react';
import AuthReducer from '../reducers/AuthReducer';
import { deleteAccount, loadUser, updateUser } from '../actions/AuthActions';

// TODO: USE COOKIES

// Initial state
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: {
        email: null,
        name: null,
        profile: null,
        iconURI: null
    },
    error: {
        msg: null,
        status: null,
        id: null
    }
};

// Create Context
export const AuthContext = createContext(initialState);
// Create Provider
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

   /**
    * @description load the user when first mounted
    */
    const loadUserCaller = () => loadUser(state.token)(dispatch);

   /**
    * @description update user account information
    * @param {Json} payload see @format {req.body}
    * @detail  For changing name | password | (email?)
    * @format  req.headers: { 'Content-Type': 'application/json', 
    *                         'x-auth-token': JWT token }
    *          req.body: { content: { name | password | (email?): newValue } }
    *          res.data: {
    *                      success: true,
    *                      user: { 
    *                              name: String, 
    *                              email: String, 
    *                              profile: ObjectId (the profileId of the user)
    *                            } 
    *                    }
    *      
    *     NOTE: email may have different implementation since we need to verify the email address
    */
    const updateUserCaller = (payload) => updateUser(state.token, payload)(dispatch);

   /**
    * @description delete user account and associated profile, platforms/quizzes created
    * @detail  subscription/fans/... other fields may not be updated
    */
    const deleteAccountCaller = () => deleteAccount(state.token)(dispatch);

    return (<AuthContext.Provider value={{
        loadUser: loadUserCaller,
        updateUser: updateUserCaller,
        deleteAccount: deleteAccountCaller,
        authDispatch: dispatch,
        ...state
    }}>
        {children}
    </AuthContext.Provider>);
};