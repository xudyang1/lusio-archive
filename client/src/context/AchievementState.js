import React, { createContext, useReducer } from 'react';
import { getAllBadges, getBadgesByIds } from '../actions/AchievementActions';
import { AchievementReducer } from '../reducers/AchievementReducer';

const initialState = {
    badges: [],
    allBadges: [],
    error: {
        msg: null,
        status: null,
        id: null
    }
};

// Create Context
export const AchievementContext = createContext(initialState);
// Create Provider
export const AchievementProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AchievementReducer);

    /**
     * @desc  Get badge cards information based on id
     * @param {Array<string|number>} ids    array of badge ids
     * @returns Promise<void>
     */
    const getBadgesByIdsCaller = (ids) => getBadgesByIds(ids)(dispatch);

    /**
     * @desc  Get all default badge cards information
     * @returns Promise<void>
     */
    const getAllBadgesCaller = () => getAllBadges()(dispatch);

    return (<AchievementContext.Provider value={{
        getBadgesByIds: getBadgesByIdsCaller,
        getAllBadges: getAllBadgesCaller,
        achievementDispatch: dispatch,
        ...state
    }}>
        {children}
    </AchievementContext.Provider>);
};