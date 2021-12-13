import React, { createContext, useReducer } from 'react';
import QuizReducer from '../reducers/QuizReducer';
import {
    QUIZZES_LOADING,
    GET_QUIZZES,
    GET_QUIZ,
    GET_QUIZZESBYID,
    UPDATE_QUIZ,
    GET_COMMENTBYID,
    ADD_QUIZ,
    DELETE_QUIZ,
    PLAY_QUIZ,
    FINISH_QUIZ,
    GET_ERRORS
} from '../types/actionTypes';
import axios from 'axios';

// Initial state
const initialState = {
    // <<<<<<< LiuxinLi
    quizzes: [],
    quiz: {
        id: null,
        userId: null,
        platformId: null,
        name: null,
        author: null,
        quizImgURI: null,
        description: null,
        timedOption: false,
        time: 0,
        showAnsOption: false,
        questions: [{
            title: null,
            choices: [""],
            answerKey: 1, //correctAnswers
            score: 0
        }],
        likes: 0,
        plays: 0,
        isPublished: false,
        scoreBoard: [],
        comments: [{
            userId: "",
            userName: "",
            text: "",
            commentId: null
        }]
    },
    error: null,
    loading: true,
    isPlaying: true,
    score: 0,
    xp: 0,
    timeSpent: 0
};

// Create context
export const QuizzesContext = createContext(initialState);

export const QuizzesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(QuizReducer, initialState);
    const cloneDeep = require('lodash.clonedeep');
    async function getQuizzes() {
        try {
            dispatch(setQuizzesLoading());
            const res = await axios.get('/api/quizzes');
            dispatch({
                type: GET_QUIZZES,
                payload: res.data
            });
            return res.data;
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    async function getQuiz(id, updateState = true) {
        try {
            if (updateState) {
                dispatch(setQuizzesLoading());
            }
            const res = await axios.get(`/api/quizzes/edit/${id}`);
            if (updateState) {
                dispatch({
                    type: GET_QUIZ,
                    payload: id
                });
            }
            return res.data;
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    //>>>>>>>>>>>>>>>>>>>>>>>>for Displaying Quizzes on Platform
    async function getQuizzesById(quizIdList) {

        const quizL = [];
        for (let i = 0; i < quizIdList.length; i++) {
            try {
                const id = quizIdList[i];
                const res = await axios.get(`/api/quizzes/edit/${id}`);
                quizL.push(res.data.data);

            } catch (err) {
                dispatch({
                    type: GET_ERRORS,
                    paylod: { msg: err.message, status: err.name }
                })
            }
        }
        return quizL;

    }
    async function getCommentById(quizId) {
        try {
            const res = await axios.get(`/api/quizzes/edit/${quizId}`);
            //console.log("getComment", res.data);
            const comments = res.data.data.comments;
            const currentCom = comments[comments.length - 1];
            //console.log("CurrentComment", currentCom);
            dispatch({
                type: GET_COMMENTBYID,
                payload: res.data.data
            });
            return currentCom._id;
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                paylod: { msg: err.message, status: err.name }
            })
        }
    }

    async function addQuiz({ userId, platformId, name, author, quizImgURI, description, timedOption, time, showAnsOption, questions, title, choices, content, answerKey, score, likes, plays, isPublished, scoreBoard, userName, userScore, comments }) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ userId, platformId, name, author, quizImgURI, description, timedOption, time, showAnsOption, questions, title, choices, content, answerKey, score, likes, plays, isPublished, scoreBoard, userName, userScore, comments });
        console.log("insideAdd", body);
        try {
            const res = await axios.post('/api/quizzes/edit', body, config);
            console.log("insideAdd", res);
            const deepCopyQuiz = cloneDeep(res.data.quiz);
            dispatch({
                type: ADD_QUIZ,
                payload: deepCopyQuiz
            });
            return res.data.quiz.id;
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    }

    async function updateQuiz({ id, userId, name, author, quizImgURI, description, timedOption, time, showAnsOption, questions, likes, plays, isPublished, scoreBoard, comments }) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ userId, name, author, quizImgURI, description, timedOption, time, showAnsOption, questions, likes, plays, isPublished, scoreBoard, comments });
        try {
            const res = await axios.put(`/api/quizzes/edit/${id}`, body, config);
            //deep copy of nested quiz
            console.log(res.data.quiz);
            const deepCopyQuiz = cloneDeep(res.data.quiz);
            console.log("deepcopy", deepCopyQuiz);

            dispatch({
                type: UPDATE_QUIZ,
                payload: deepCopyQuiz
            });
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
    async function playQuiz(id) {
        try {
            const res = await axios.get(`/api/quizzes/edit/${id}`);
            dispatch({
                type: PLAY_QUIZ,
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS
            });
        }
    }
    function finishQuiz(score, xp, timeSpent) {
        try {
            dispatch({
                type: FINISH_QUIZ,
                payload: { score: score, xp: xp, timeSpent: timeSpent }
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS
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
        quiz: state.quiz,
        error: state.error,
        loading: state.loading,
        isPlaying: state.isPlaying,
        score: state.score,
        xp: state.xp,
        timeSpent: state.timeSpent,
        getQuizzes,
        getQuiz,
        getQuizzesById,
        getCommentById,
        addQuiz,
        updateQuiz,
        deleteQuiz,
        playQuiz,
        finishQuiz
    }}>
        {children}
    </QuizzesContext.Provider>);
};