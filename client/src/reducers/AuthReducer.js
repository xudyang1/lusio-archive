import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_ERRORS,
    CLEAR_ERRORS
} from "../types/actionTypes";

// const initialState = {
//     token: localStorage.getItem('token'),
//     isAuthenticated: null,
//     isLoading: false,
//     user: null,
//     error: {
//         msg: null,
//         status: null,
//         id: null
//     }
// };

export default function AuthReducer(state, action) {
    switch (action.type) {
        case USER_LOADING:
            console.log('Inside USER_LOADING')
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            console.log("Inside USER_LOADED");
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            console.log('Inside LOGIN_SUCCESS');
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: {
                    msg: null,
                    status: null,
                    id: null
                }
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            console.log('Inside ERROR')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            console.log('Inside CLEAR_ERROR')
            return {
                ...state,
                error: {
                    msg: null,
                    status: null,
                    id: null
                }
            };
        default:
            return state;
    }
}