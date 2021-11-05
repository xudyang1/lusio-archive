import { createContext, useReducer } from "react"
import UserReducer from "../reducers/UserReducer"

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

const initialState = {
    user: {
        id: 0,
        accountStatus: 1,
        name: "",
        email: "",
        description: "",
        profileIcon: "",
        profileBanner: "",
        level: 0,
        currentExp: 0,
        maxExp: 0,
        achievements: [],
        quizzes: [],
        subscribedUser: [],
        subscribedPlat: []
    },
    error: {
        msg: null,
        status: null,
        id: null
    }
}

export const UserContext = createContext(initialState)

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState)

    async function loadUserDetails() {
        try{
            dispatch({
                type: GET_PROFILES,
                payload: ""
            })
        }
        catch(err){

        }
    }
}