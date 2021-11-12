
//TODO
// _____ ___  ___   ___  
// |_   _/ _ \|   \ / _ \ 
//   | || (_) | |) | (_) |
//   |_| \___/|___/ \___/

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
    loading: true
};
export const PlatformReducer = (state, action) => {
    switch (action.type) {
    }
};