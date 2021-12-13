import {
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    DELETE_ACCOUNT,
    GET_ERRORS,
    CLEAR_ERRORS,
    UPDATE_SUCCESS,
} from "../types/actionTypes";

export function getToken(cookieToken) {
    const keyval = cookieToken.split(";")[0];
    const token = keyval.split("=")[1];
    return token;
}

export const authInitialState = {
    //token: localStorage.getItem('token'),
    //Get token from cookie
    token: getToken(document.cookie),
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
            //localStorage.setItem('token', payload.token);
            //create a cookie with token value
            document.cookie = ("token=" + payload.token + "; " + "path=/;" + " secure");
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
                token: payload.token,
                error: authInitialState.error
            };
        case LOGOUT_SUCCESS:
            //localStorage.removeItem('token');
            //delete a cookie
            document.cookie = ("token=" + "; " + "max-age=0; " + "path=/");
            return {
                ...state,
                token: null,
                user: authInitialState.user,
                isAuthenticated: false,
                error: payload
            };
        case DELETE_ACCOUNT:
            //localStorage.removeItem('token');
            //delete a cookie
            document.cookie = ("token=" + "; " + "max-age=0; " + "path=/");
            return authInitialState;
        case UPDATE_SUCCESS:
            return {
                ...state,
                user: { ...state.user, ...payload.user }
            };
        case GET_ERRORS:
            return {
                ...state,
                error: {
                    msg: payload.msg,
                    status: payload.status,
                    id: payload.id
                }
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: authInitialState.error
            };
        default:
            return state;
    }
}