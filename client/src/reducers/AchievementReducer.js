import { GET_ALL_BADGES, GET_BADGES, GET_ERRORS, CLEAR_ERRORS } from "../types/actionTypes";

export const achievementInitialState = {
    badges: [],
    allBadges: [],
    error: {
        msg: null,
        status: null,
        id: null
    }
};

export const AchievementReducer = (state, { type, payload }) => {
    console.log("AchievementReducer: type", type);
    console.log("AchievementReducer: payload", payload);
    switch (type) {
        case GET_BADGES:
            return {
                ...state,
                badges: payload.badges
            };
        case GET_ALL_BADGES:
            return {
                ...state,
                allBadges: payload.badges
            }
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
                error: achievementInitialState.error
            };
        default:
            return state;
    }
};