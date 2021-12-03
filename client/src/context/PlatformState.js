import axios from "axios";
import React from "react";
import { createContext, useContext, useReducer } from "react";
import { PlatformReducer } from "../reducers/PlatformReducer";
import {
    ADD_PLATFORM,
    CLEAR_ERRORS,
    DELETE_PLATFORM,
    GET_ERRORS,
    GET_PLATFORM,
    GET_PLATFORMS,
    GET_PLATFORM_LIST,
    UPDATE_PLATFORM
} from "../types/actionTypes";
import { AuthContext } from "./AuthState";

const initialState = {
    platform: {
        _id: null,
        name: null,
        owner: null,
        admins: [],
        subscribers: [],
        description: null,
        bannerURI: null,
        backgroundURI: null,
        quizzes: [],
        likes: 0,
        numSubscribers: 0,
        quizSections: [],
    },
    error: null,
    loading: true,
    // three types: 'GUEST_VIEW' | 'OWNER_VIEW' | 'ADMIN_VIEW' (for platform)
    viewType: 'GUEST_VIEW'
};

export const PlatformContext = createContext(initialState);

export const PlatformProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PlatformReducer, initialState);
    const { token } = useContext(AuthContext);
    // set up config/headers and token
    const tokenConfig = token => {
        // headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        // if token, add to headers
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    };

    // token: can be null
    async function getPlatformList(reload = true) {
        try {
            const res = await axios.get('/api/platforms/platformList', tokenConfig(token));
            if (reload)
                dispatch({
                    type: GET_PLATFORM_LIST,
                    payload: res.data
                });
            return res.data
        } catch (err) {
            if (reload)
                dispatch({
                    type: GET_ERRORS,
                    payload: { msg: err.response.data.msg, status: err.response.status }
                });
        }
    };
    async function getPlatform(id, reload = true) {
        try {
            const res = await axios.get(`/api/platforms/platform/${id}`, tokenConfig(token));
            if (reload)
                dispatch({
                    type: GET_PLATFORM,
                    payload: res.data
                });
            console.log(res.data);
            return res.data;
        } catch (err) {
            if (reload)
                dispatch({
                    type: GET_ERRORS,
                    payload: { msg: err.response.data.msg, status: err.response.status }
                });
        }
    };
    /**
     * set up format: 
     * { name, description, bannerURI, backgroundURI }
     */
    async function createPlatform(init) {
        try {
            const body = JSON.stringify(init);
            const res = await axios.post('/api/platforms/add', body, tokenConfig(token));
            dispatch({
                type: ADD_PLATFORM,
                payload: res.data
            });
            return res.data;
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };

    /**
     *
     * @payload  req.header('x-auth-token): JWT token
     *           req.body: 
     *            { mode: "EDIT", platform: { owner || name || description || iconURI || bannerURI: newValue 
     *                                    or quizSections: { _id, sectionName, sectionIndex } } }
     *            Or
     *            { mode: "ADD", platform: { admins || quizzes: {_id} } or quizSections: { sectionName, sectionIndex } }
     *            Or
     *            { mode: "DELETE", platform: { admins || quizzes || quizSections: {_id} } }
     *          res.data:
     *            {
     *              success: true,
     *              mode: "EDIT" || "ADD" || "DELETE"
     *              content: { description || ... || quizSections: updated data }
     *            }
     */
    async function updatePlatform(platformId, payload) {
        try {
            const body = JSON.stringify(payload);
            const res = await axios.patch(`/api/platforms/platform/edit/${platformId}`, body, tokenConfig(token));
            dispatch({
                type: UPDATE_PLATFORM,
                payload: res.data
            });
            console.log(res)
        } catch (err) {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };

    async function removePlatform(platformId) {
        try {
            const res = await axios.delete(`/api/platforms/platform/${platformId}`, tokenConfig(token));
            dispatch({
                type: DELETE_PLATFORM,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    // clear errors
    function clearErrors() {
        dispatch({
            type: CLEAR_ERRORS
        });
    };

    return (<PlatformContext.Provider value={{
        getPlatformList,
        getPlatform,
        createPlatform,
        updatePlatform,
        removePlatform,
        clearErrors,
        ...state
    }}>
        {children}
    </PlatformContext.Provider>
    );
};