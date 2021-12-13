import { GET_PROFILE_CARDS, GET_PROFILE, UPDATE_PROFILE, UPDATE_SUCCESS } from '../types/actionTypes';
import axios from 'axios';
import { returnErrors } from './ErrorActions';
import { tokenConfig } from './AuthActions';

/**
 * TODO: 
 * @desc  Retrive a list of user profile card information
 * @param {Array<string>}   ids array of profile ids: [1,2,3]
 * @detail  Only profile _id, name, description, iconURI, level, currentExp, maxExp are needed
 * @format  req.query: { id: [1,2...] }
 *          res.data: { 
 *                      length: Number, 
 *                      profileCards: [{ _id, name, description, iconURI, level, currentExp, maxExp }]       
 *                    }
 */
export const getProfileCards = (ids) => async (dispatch, errorDispatch) => {
    try {
        const queryStr = ids.map(id => 'id=' + id).join('&');
        const res = await axios.get(`/api/profiles/profileCards?${queryStr}`);
        dispatch({
            type: GET_PROFILE_CARDS,
            payload: res.data
        });
    } catch (err) {
        errorDispatch(returnErrors(err));
    }
};

/**
 * TODO: edit this part
 * @desc  Get a user's profile for view
 * @param {string}  token JWT token or null
 * @param {string}  id  profile id of the target profile
 * @returns 
 * @format  req.header('x-auth-token'): JWT token || null
 *          res.data: { 
 *                      viewType: "GUEST_VIEW" || "OWNER_VIEW", 
 *                      profile: { profile document except 'owner' attribute }         
 *                    }
 */
export const getProfile = (token, id, reload = true) => async (dispatch, errorDispatch = dispatch) => {
    try {
        const res = await axios.get(`/api/profiles/profile/${id}`, tokenConfig(token));
        if (reload)
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        return res;
    } catch (err) {
        if (reload)
            errorDispatch(returnErrors(err));
    }
};


/**
 * TODO: might have some change
 * @desc  Update the profile for the owner
 * @param {string}  token   JWT token or null
 * @param {string}  id      profile id
 * @param {JSON}    payload see @format
 * @returns Promise<void>
 * @detail  Client side can only send limited updated content:
 *              edit existing: {description, iconURI, bannerURI}
 *              add or delete: {platformsCreated, 
 *                              quizzesCreated, 
 *                              subscribedUsers,
 *                              subscribedPlatforms, 
 *                              fans}
 * 
 *              Other fields should not be updated here.
 * 
 * @format  req.body: { mode: "EDIT", profile: description || iconURI || bannerURI: newVal } 
 *                    Or
 *                    {
 *                      mode: "ADD" || "DELETE", 
 *                      profile: { platformsCreated || quizzesCreated || subscribedUsers || subscribedPlatforms || fans: {_id: ObjectId} }
 *                    }
 *          res.data: {
 *                      success: true,
 *                      mode: "EDIT" || "ADD" || "DELETE",
 *                      content: { description || iconURI || ... || fans: updated content }
 *                    }
 */
export const updateProfile = (token, id, payload) => async (dispatch, errorDispatch = dispatch) => {
    const body = JSON.stringify(payload);
    try {
        const res = await axios.patch(`/api/profiles/profile/edit/${id}`, body, tokenConfig(token));
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        errorDispatch(returnErrors(err));
    }
};

/**
 * 
 * @param {string} token JWT token
 * @param {string || number} id profile id
 * @param {JSON} payload { "image": file, "field": "iconURI" || "bannerURI"}
 * @returns Promise<void>
 * @format  req.headers{ 'content-type': 'multipart/form-data',
 *                       'x-auth-token': token}
 *                       
 *          req.body (form data): { "image": image file, 
 *                                  "field": "iconURI" || "bannerURI"}
 *          res{ success: true, profile: {"iconURI" || "bannerURI": newVal} }
 */
export const updateImage = (token, id, payload) => async (dispatch, authDispatch, errorDispatch = dispatch) => {
    const formData = new FormData();
    Object.entries(payload).forEach(pair => formData.append(pair[0], pair[1]));

    const fileConfig = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token
        }
    };

    try {
        const res = await axios.post(`/api/profiles/profile/upload/${id}`, formData, fileConfig);
        console.log("update image", res);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        authDispatch({
            type: UPDATE_SUCCESS,
            payload: { user: res.data.profile }
        });
    } catch (err) {
        console.log("image", err);
        errorDispatch(returnErrors(err));
    }
};
