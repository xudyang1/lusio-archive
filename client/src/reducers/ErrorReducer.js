import { GET_ERRORS, CLEAR_ERRORS } from "../types/actionTypes";

export const errorInitialState = {
    msg: null,
    status: null,
    id: null
};

export const ErrorReducer = (state, { type, payload }) => {
    console.log("ErrorReducer: type", type);
    console.log("ErrorReducer: payload", payload);
    switch (type) {
        case GET_ERRORS:
            return {
                msg: payload.msg,
                status: payload.status,
                id: payload.id
            };
        case CLEAR_ERRORS:
            return errorInitialState;
        default:
            return state;
    }
};