import { ADD_PROFILE, 
  GET_PROFILES, 
  GET_PROFILE, 
  UPDATE_PROFILE, 
  PROFILES_LOADING, 
  GET_ERRORS, 
  CLEAR_ERRORS } from "../types/actionTypes";

export const ProfileReducer = (state, action) => {
  console.log("ProfileReducer, action: ", action.type)
  console.log("ProfileReducer, payload: ", action.payload)
  switch (action.type) {
    case PROFILES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profile: action.payload.profile
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload.profile,
        viewType: action.payload.viewType
      };
    // case ADD_PROFILE:
    //   return {
    //     ...state,
    //     loading: false,
    //     userProfile: action.payload
    //   };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: {...state.profile, ...action.payload.profile}
      };
    // case DELETE_ACCOUNT:
    //   return {
    //     ...state,
    //     userProfile: null
    //   };
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}