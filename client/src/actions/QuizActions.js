import { QUIZZES_LOADING, GET_QUIZZES, GET_QUIZ, UPDATE_QUIZ, ADD_QUIZ, DELETE_QUIZ } from '../types/actionTypes';
import axios from 'axios';
import { returnErrors } from './ErrorActions';

export const setQuizzesLoading = () => {
    return {
        type: QUIZZES_LOADING
    };
};

export const getQuizzes = (dispatch) => async () => {
    try {
        const res = await axios.get('/api/quizzes');
        dispatch({
            type: GET_QUIZZES,
            payload: res.data
        });
    } catch (err) {
        console.error("get Quizzes Error: ", err);
    }
};

export const addQuiz = (dispatch, quiz) => async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const body = JSON.stringify(quiz);
        const res = await axios.post('/api/quizzes', body, config);

        dispatch({
            type: ADD_QUIZ,
            payload: res.data
        });
    } catch (err) {
        dispatch(returnErrors(err.response.data.error));
    }
}

export const deleteQuiz = (dispatch, id) => async () => {
    try {
        await axios.delete(`/api/quizzes/edit/${id}`);

        dispatch({
            type: DELETE_QUIZ,
            payload: id
        });
    } catch (err) {
        dispatch(returnErrors(err.response.data.error));
    }
}