import {
    PROFILES_LOADING,
    GET_PROFILES,
    ADD_PROFILE,
    UPDATE_PROFILE,
    DELETE_ACCOUNT
} from "../types/actionTypes"

//TODO
// _____ ___  ___   ___  
// |_   _/ _ \|   \ / _ \ 
//   | || (_) | |) | (_) |
//   |_| \___/|___/ \___/

export default function UserReducer(state, action) {
    switch (action.type) {
        case PROFILES_LOADING:
        case GET_PROFILES:
        case ADD_PROFILE:
            return {
                id: action.payload.id,
                accountStatus: action.payload.accountStatus,
                name: action.payload.name,
                email: action.payload.email,
                description: action.payload.description,
                profileIcon: action.payload.profileIcon,
                profileBanner: action.payload.profileBanner,
                level: action.payload.level,
                currentExp: action.payload.currentExp,
                maxExp: action.payload.maxExp,
                achievements: action.payload.achievements,
                quizzes: action.payload.quizzes,
                subscribedUser: action.payload.subscribedUser,
                subscribedPlat: action.payload.subscribedPlat
            }
        case UPDATE_PROFILE:
        case DELETE_ACCOUNT:
        default:
            return state
    }
}