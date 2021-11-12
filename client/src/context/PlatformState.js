import { createContext, useReducer } from "react"
import { PlatformReducer } from "../reducers/PlatformReducer";



const initialState = {
    platofrom: {
        id: null,
        name: null,
        description: null,
        bannerURI: null,
        backgroundURI,
        owner: null,
        admins: [],
        quizSections: [],
        quizzes: [],
        likes: 0,
        numSubscribers: 0,
    },
    error: null,
    loading: true,
    // three types: 'GUEST_VIEW' | 'OWNER_VIEW' | 'ADMIN_VIEW' (for platform)
    viewType: 'GUEST_VIEW' 
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