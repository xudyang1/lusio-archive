import React, { createContext, useReducer } from 'react';
import QuizReducer from '../reducers/QuizReducer';
import {
    QUIZZES_LOADING,
    GET_QUIZZES,
    GET_QUIZ,
    UPDATE_QUIZ,
    ADD_QUIZ,
    DELETE_QUIZ,
    GET_ERRORS
} from '../types/actionTypes';
import axios from 'axios';

// Initial state
const initialState = {
    quizzes: [],
    quiz: {
        id: null,
        userId: null,
        name: "",
        description: "",
        platformId: "", //Needs update
        timed: false,
        time: 5, // Needs update
        retake: false,
        showQuestion: false,
        showAnswer: false,
        likes: 0,
        plays: 0, // Needs update
        created: "",
        EXP: 0,
        questions: [],
        answers: [],
        correctAnswers: [], // Needs update
        scoreboard: [], //Needsupdate
        isPublished: false
    },
    error: null,
    loading: true
};

// Create context
export const QuizzesContext = createContext(initialState);

export const QuizzesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(QuizReducer, initialState);

    async function getQuizzes() {
        try {
            dispatch(setQuizzesLoading());
            const res = await axios.get('/api/quizzes');
            dispatch({
                type: GET_QUIZZES,
                payload: res.data
            });
            console.log("quizzes are : ", res.data);
            return res.data;
        } catch (err) {
            console.error(err);
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    async function getQuiz(id) {
        try {
            dispatch(setQuizzesLoading());
            const res = await axios.get(`/api/quizzes/edit/${id}`);
            dispatch({
                type: GET_QUIZ,
                payload: id
            });
            console.log("quiz is : ", res.data);
            return res.data;
        } catch (err) {
            console.error(err);
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };

    async function addQuiz({ userId, name, description, timed, retake, showQuestion, showAnswer, likes, created, EXP, questions, answers, isPublished }) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ userId, name, description, timed, retake, showQuestion, showAnswer, likes, created, EXP, questions, answers, isPublished });
        try {
            const res = await axios.post('/api/quizzes/edit', body, config);

            dispatch({
                type: ADD_QUIZ,
                payload: res.data
            });
            return res.data.quiz.id;
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    }

    async function updateQuiz({ id, userId, name, description, timed, retake, showQuestion, showAnswer, likes, created, EXP, questions, answers, isPublished }) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ userId, name, description, timed, retake, showQuestion, showAnswer, likes, created, EXP, questions, answers, isPublished });
        try {
            const res = await axios.put(`http://localhost:5000/api/quizzes/edit/${id}`, body, config);
            dispatch({
                type: UPDATE_QUIZ,
                payload: res.data
            });
            console.log("After adding quiz, success, state: ", res.data);
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    async function deleteQuiz(id) {
        try {
            await axios.delete(`/api/quizzes/edit/${id}`);

            dispatch({
                type: DELETE_QUIZ,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    }
    const setQuizzesLoading = () => {
        return {
            type: QUIZZES_LOADING
        };
    };
    return (<QuizzesContext.Provider value={{
        quizzes: state.quizzes,
        error: state.error,
        loading: state.loading,
        getQuizzes,
        getQuiz,
        addQuiz,
        updateQuiz,
        deleteQuiz
    }}>
        {children}
    </QuizzesContext.Provider>);
};