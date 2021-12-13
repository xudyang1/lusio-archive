import React, { createContext, useContext, useReducer } from 'react';
import { getProfile, updateImage, updateProfile } from '../actions/ProfileActions';
import { ProfileReducer } from '../reducers/ProfileReducer';
import { AuthContext } from './AuthState';

// Initial state
const initialState = {
    profile: {
        _id: null,
        owner: null,
        platformsCreated: [],
        quizzesCreated: [],
        //>>>>>>>>>>ADDON to be checked
        commentsCreated: [],
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

// Create context
export const ProfileContext = createContext(initialState);

export const ProfilesProvider = ({ children }) => {
    const { token, authDispatch } = useContext(AuthContext);
    const [state, dispatch] = useReducer(ProfileReducer, initialState);


    // getProfileCards(ids) function is inside ProfileActions.js
    // To call the function, set local profileCards state inside your functional component:
    /**
     * const profileCardsInitialState = {
     *  _id: null, 
     *  name: null, 
     *  description: null, 
     *  iconURI: null, 
     *  level: 0, 
     *  currentExp: 0, 
     *  maxExp: 0
     * }
     * const [profileCards, dispatch] = useReducer(profileCardsInitialState)
     * ......
     * somewhere: 
     *  getProfileCards()(dispatch)
     * 
     */

    /**
     * @desc  Get a user's profile for view
     * @param {string}  id  profile id of the target profile
     * @returns 
     * @format  req.header('x-auth-token'): JWT token || null
     *          res.data: { 
     *                      viewType: "GUEST_VIEW" || "OWNER_VIEW", 
     *                      profile: { profile document except 'owner' attribute }         
     *                    }
     */
    const getProfileCaller = (id, reload = true) => getProfile(token, id, reload)(dispatch);

    /**
     * @desc  Update the profile for the owner
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
    const updateProfileCaller = (payload) => updateProfile(token, state.profile._id, payload)(dispatch);
    /**
     *
     * @param {JSON} payload { "image": file, "field": "iconURI" || "bannerURI"}
     * @returns Promise<void>
     * @format  req.headers{ 'content-type': 'multipart/form-data',
     *                       'x-auth-token': token}
     *                       
     *          req.body (form data): { "image": image file, 
     *                                  "field": "iconURI" || "bannerURI"}
     *          res{ success: true, "iconURI" || "bannerURI": newVal}
     */
    const updateImageCaller = (payload) => updateImage(token, state.profile._id, payload)(dispatch, authDispatch);

    return (<ProfileContext.Provider value={{
        getProfile: getProfileCaller,
        updateProfile: updateProfileCaller,
        updateImage: updateImageCaller,
        profileDispatch: dispatch,
        ...state
    }}>
        {children}
    </ProfileContext.Provider>);
};