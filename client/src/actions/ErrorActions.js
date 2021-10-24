import { GET_ERRORS } from "../types/actionTypes";
// return errors 
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id}
    };
};