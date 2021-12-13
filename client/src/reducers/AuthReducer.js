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

// export function getToken(cookieToken) {
//     const keyval = cookieToken.split(";");
//     console.log("keyval", keyval);
//     var token = null;
//     for (let i = 0; i < keyval.length; i++){
//         if (keyval[i].split("=")[0].trim() == "token") {
//             token = keyval[i].split("=")[1];
//         }
//     }
//     return token;
// }

export const authInitialState = {
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
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
                error: authInitialState.error
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: authInitialState.user,
                isAuthenticated: false,
                error: authInitialState.error
            };
        case DELETE_ACCOUNT:
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