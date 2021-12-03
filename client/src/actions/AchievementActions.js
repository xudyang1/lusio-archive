import axios from 'axios';
import { GET_ALL_BADGES, GET_BADGES } from '../types/actionTypes';
import { returnErrors } from './ErrorActions';


/**
 * @desc  Get badge cards information based on id
 * @param {Array<string|number>} ids    array of badge ids
 * @returns Promise<void>
 * @format  res.data: { 
 *              length: number,
 *              badges: [{ _id, title, description, imageURI, requirement }...] 
 *          }
 */
export const getBadgesByIds = (ids) => async (dispatch, errorDispatch = dispatch) => {
    try {
        const queryStr = ids.map(id => 'id=' + id).join('&');
        const res = await axios.get(`/api/achievement/badges?${queryStr}`);
        dispatch({
            type: GET_BADGES,
            payload: res.data
        });
    } catch (err) {
        errorDispatch(returnErrors(err));
    }
};

/**
 * @desc  Get all default badge cards information
 * @returns Promise<void>
 * @format  res.data: { 
 *              length: number,
 *              badges: [{ _id, title, description, imageURI, requirement }...] 
 *          }
 */
export const getAllBadges = () => async (dispatch, errorDispatch = dispatch) => {
    try {
        const res = await axios.get('/api/achievement/badges?all=true');
        dispatch({
            type: GET_ALL_BADGES,
            payload: res.data
        });
    } catch (err) {
        errorDispatch(returnErrors(err));
    }
};

