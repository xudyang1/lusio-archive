import {
    GET_PROFILE_CARDS,
    GET_PROFILE,
    UPDATE_PROFILE,
    GET_ERRORS,
    CLEAR_ERRORS,
} from "../types/actionTypes";

export const profileInitialState = {
    profile: {
        _id: null,
        owner: null,
        platformsCreated: [],
        quizzesCreated: [],
        description: null,
        iconURI: null,
        bannerURI: null,
        level: 0,
        currentExp: 0,
        maxExp: 0,
        achievements: [],
        quizzesTaken: [],
        likedQuizzes: [],
        subscribedUsers: [],
        subscribedPlatforms: [],
        fans: []
    },
    viewType: 'GUEST_VIEW', // 'GUEST_VIEW' or 'OWNER_VIEW'
    error: {
        msg: null,
        status: null,
        id: null
    }
};

export const ProfileReducer = (state, { type, payload }) => {
    switch (type) {
        case GET_PROFILE_CARDS:
            return {
                ...state,
                profileCards: payload.profileCards
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: payload.profile,
                viewType: payload.viewType
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: { ...state.profile, ...payload.profile }
            };
        case GET_ERRORS:
            return {
                ...state,
                error: {
                    msg: payload.msg,
                    status: payload.status,
                    id: payload.id
                }
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: profileInitialState.error
            };
        default:
            return state;
    }
};