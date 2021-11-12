import { createContext, useContext, useReducer } from "react";
import { PlatformReducer } from "../reducers/PlatformReducer";
import { GET_PLATFORM, GET_PLATFORMS } from "../types/actionTypes";
import { AuthContext } from "./AuthState";


const initialState = {
    platofrom: {
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

    async function getPlatform(id) {
        try {
            const res = await axios.get(`/api/profiles/profile/${id}`, tokenConfig(token));
            console.log("res", res);
            dispatch({
                type: GET_PLATFORM,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };

    async function createPlatform() {

    };

    async function updatePlatform() {

    };

    async function removePlatform() {

    };

    return (<PlatformProvider value={{
        getPlatform,
        createPlatform,
        updatePlatform,
        removePlatform,
    }}>
        {children}
    </PlatformProvider>
    );
};