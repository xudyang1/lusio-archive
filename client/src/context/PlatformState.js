import { createContext, useReducer } from "react"
import { PlatformReducer } from "../reducers/PlatformReducer";



const initialState = {
    platofrom: {
        platform_id: null,
        platform_name: "",
        platform_description: "",
        platform_banner_URL: "",
        platform_owner: null,
        platform_admins: [],
        platform_sections: [],
        platform_quizzes: [],
        platform_subs: 0,
    },
    error: null,
    loading: true
}

export const PlatformContext = createContext(initialState);

export const PlatformProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PlatformReducer, initialState)

    //TODO
    // _____ ___  ___   ___  
    // |_   _/ _ \|   \ / _ \ 
    //   | || (_) | |) | (_) |
    //   |_| \___/|___/ \___/

    async function getPlatform(id) {

    };

    async function createPlatform() {

    };

    async function updatePlatform() {

    };

    async function removePlatform() {

    };

    return(<PlatformProvider value={{
        getPlatform,
        createPlatform,
        updatePlatform,
        removePlatform,
    }}>
        {children}
    </PlatformProvider>
    )
}