
//TODO
// _____ ___  ___   ___  
// |_   _/ _ \|   \ / _ \ 
//   | || (_) | |) | (_) |
//   |_| \___/|___/ \___/

import { ADD_PLATFORM, DELETE_PLATFORM, GET_ERRORS, GET_PLATFORM, GET_PLATFORMS, UPDATE_PLATFORM, CLEAR_ERRORS } from "../types/actionTypes";

const initialState = {
    platofrom: {
        id: null,
        name: null,
        description: null,
        bannerURI: null,
        backgroundURI: null,
        owner: null,
        admins: [],
        quizSections: [],
        quizzes: [],
        likes: 0,
        numSubscribers: 0,
    },
    error: null,
    loading: true
};
export const PlatformReducer = (state, action) => {
    switch (action.type) {
        case GET_PLATFORM:
            return {
                ...state,
                platform: action.payload.platform,
                viewType: action.payload.viewType
            };
        case ADD_PLATFORM:
            return {
                ...state,
                platform: action.payload.platform,
                viewType: 'OWNER_VIEW'
            };
        case UPDATE_PLATFORM:
            // TODO: the order matters, check
            return {
                ...state,
                platform: { ...state.platform, ...action.payload.content },
                mode: action.payload.mode
            };
        case DELETE_PLATFORM:
            return initialState;
        case GET_ERRORS:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};