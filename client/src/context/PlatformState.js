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
    //TODO
    // _____ ___  ___   ___  
    // |_   _/ _ \|   \ / _ \ 
    //   | || (_) | |) | (_) |
    //   |_| \___/|___/ \___/
    
    // token: can be null
    async function getPlatformList(token) {
        try {
            const res = await axios.get('/api/platforms/platformList', tokenConfig(token));
            //console.log("res", res);
            dispatch({
                type: GET_PLATFORM_LIST,
                payload: res.data
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    async function getPlatform(id) {
        try {
            const res = await axios.get(`/api/platforms/platform/${id}`, tokenConfig(token));
            //console.log("res", res);
            if (reload)
                dispatch({
                    type: GET_PLATFORM,
                    payload: res.data
                });
            return res.data
        } catch (err) {
            console.log(err)
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
            // console.log("res", res);
            dispatch({
                type: ADD_PLATFORM,
                payload: res.data
            });
            return res.data
        } catch (err) {
            //console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    /**
    *
    * @payload req.body = 
    *      { mode: "EDIT", platform: owner | description | iconURI | bannerURI } 
    *  Or
    *      {
    *        mode: "ADD" | "DELETE", 
    *        platform: admins | quizzes | quizSections
    *      }
    */
    async function updatePlatform(platformId, payload) {
        try {
            const body = JSON.stringify(payload);
            const res = await axios.patch(`/api/platforms/platform/edit/${platformId}`, body, tokenConfig(token));
            // console.log("res", res);
            dispatch({
                type: UPDATE_PLATFORM,
                payload: res.data
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };

    async function removePlatform(platformId) {
        try {
            const res = await axios.delete(`api/platforms/platform/${platformId}`, tokenConfig(token));
            // console.log("res", res);
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
        // console.log("Called clearErrors()");
    };

    return (<PlatformContext.Provider value={{
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