import {
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    DELETE_ACCOUNT,
} from "../types/actionTypes";

export const authInitialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: {
        email: null,
        name: null,
        profile: null,
        iconURI: null
    }
};

export default function AuthReducer(state, { type, payload }) {
    console.log("AuthReducer: type", type);
    console.log("AuthReducer: payload", payload);
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
                token: payload.token,
                error: authInitialState.error
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: authInitialState.user,
                isAuthenticated: false,
                error: payload
            };
        case DELETE_ACCOUNT:
            localStorage.removeItem('token');
            return authInitialState;
        default:
            return state;
    }
}