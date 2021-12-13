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
import { tokenConfig } from "../actions/AuthActions";


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



    // token: can be null
    async function getPlatformList(reload = true) {
        try {
            const res = await axios.get('/api/platforms/platformList', tokenConfig());
            if (reload)
                dispatch({
                    type: GET_PLATFORM_LIST,
                    payload: res.data
                });
            return res.data;
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
            const res = await axios.get(`/api/platforms/platform/${id}`, tokenConfig());
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
            const res = await axios.post('/api/platforms/add', body, tokenConfig());
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
     *            { mode: "EDIT", platform: { owner || name || description || iconURI || bannerURI: newValue || numSubscribers 
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
            const res = await axios.patch(`/api/platforms/platform/edit/${platformId}`, body, tokenConfig());
            dispatch({
                type: UPDATE_PLATFORM,
                payload: res.data
            });
            console.log("UPDATE PLATFORM", res);
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
            const res = await axios.delete(`/api/platforms/platform/${platformId}`, tokenConfig());
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

    /**
     * 
     * @param {string || number} platformId platform id
     * @param {JSON} payload { "image": file, "field": "bannerURI"}
     * @returns Promise<void>
     * @format  req.headers{ 'content-type': 'multipart/form-data',
     *                       'x-auth-token': token}
     *                       
     *          req.body (form data): { "image": image file, 
     *                                  "field": "bannerURI"}
     *          res{ success: true, platform: {"bannerURI": newVal} }
     */
    async function updateBanner(platformId, payload) {
        const formData = new FormData();
        Object.entries(payload).forEach(pair => formData.append(pair[0], pair[1]));

        const fileConfig = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            credentials: "include"
        };

        try {
            const res = await axios.post(`/api/platforms/platform/upload/${platformId}`, formData, fileConfig);
            console.log("update banner", res);
            dispatch({
                type: UPDATE_PLATFORM,
                payload: res.data
            });
        } catch (err) {
            console.log("platform banner err", err);
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.success, status: err.response.status }
            });
        }
    };

    return (<PlatformContext.Provider value={{
        getPlatformList,
        getPlatform,
        createPlatform,
        updatePlatform,
        removePlatform,
        clearErrors,
        updateBanner,
        ...state
    }}>
        {children}
    </PlatformContext.Provider>
    );
};