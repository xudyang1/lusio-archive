import { GET_ERRORS, CLEAR_ERRORS } from "../types/actionTypes";
/**
 * 
 * @param {Error} error error received from response
 * @param {string} errorId  type of error 
 * @returns a JSON object representing {GET_ERRORS} action
 * @usage   someDispatch(returnErrors(error, errorId)); usually used in catch blocks
 */
export const returnErrors = (error, errorId) => {
    return {
        type: GET_ERRORS,
        payload: {
            msg: error.response.data.msg,
            status: error.response.status,
            id: errorId
        }
    };
};

/**
 * @description clear errors action
 * @returns a JSON object representing {CLEAR_ERRORS} action
 * @usage   someDispatch(clearErrors()); usually used in local components
 */
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};