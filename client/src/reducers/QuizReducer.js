import { GET_QUIZZES, 
  GET_QUIZ,
  QUIZZES_LOADING, 
  ADD_QUIZ, 
  DELETE_QUIZ, 
  UPDATE_QUIZ,
  GET_ERRORS, 
  FINISH_QUIZ,
  CLEAR_ERRORS } from "../types/actionTypes";

export default function QuizReducer (state, action) {
  switch (action.type) {
    case QUIZZES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_QUIZZES:
      return {
        ...state,
        loading: false,
        quizzes: action.payload
      };
    case GET_QUIZ:
      return {
        ...state,
//<<<<<<< LiuxinLi
        quiz: state.quizzes.filter(quiz => quiz._id === action.payload),
        loading: false
      }
// =======
//         quiz: state.quizzes.filter(quiz => quiz._id === action.payload)
//       };
    case DELETE_QUIZ:
      return {
        ...state,
        quiz: state._id !== action.payload
      };
//>>>>>>> main
    case ADD_QUIZ:
      return {
        ...state,
        quiz: action.payload
      };
    case UPDATE_QUIZ:
      return {
        ...state,
        quiz: action.payload
// <<<<<<< LiuxinLi
//       }
//     case DELETE_QUIZ:
//       return {
//         ...state,
//         quiz: action.payload
// =======
// >>>>>>> main
      };
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isPlaying: false,
        score: action.payload.score,
        timeSpent: action.payload.timeSpent
      };
    default:
      return state;
  }
};