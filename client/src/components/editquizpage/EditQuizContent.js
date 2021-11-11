import React, {useContext, useState, useEffect, Component} from 'react';
import { withRouter } from "react-router";
import { QuizzesContext } from "../../context/QuizState";

class EditQuizContent extends Component{
    static contextType = QuizzesContext;

    constructor(){
        super();
        this.state = {
            id: "",
            userId: "",
            name: "",
            description: "",
            timed: false, 
            retake: false, 
            showQuestion: false, 
            showAnswer: false,
            likes: 0,
            created: "",
            EXP: 0,
            questions:[],
            answers: [],
        };
    }
    
    getItem = async (id, getQuizzes) => {
        const setCurrentQuiz = async (id) => {
            const quizzes = () => {
                return getQuizzes()
                .then(function(result){
                    //console.log("result is", result);
                    return result;
                })
            }
            const quizL = await quizzes();
            //console.log("QuizList is ",quizL.data);
            const quiz = quizL.data.filter(q => q._id === id);
            console.log("Quiz", quiz[0]);
            return quiz[0];
        }
        const quiz = await setCurrentQuiz(id);
        this.setState({
            id: quiz._id,
            userId: quiz.userId,
            name: quiz.name,
            description: quiz.description,
            timed: quiz.timed, 
            retake: quiz.retake, 
            showQuestion: quiz.showQuestion, 
            showAnswer: quiz.showAnswer,
            likes: quiz.likes,
            created: quiz.created,
            EXP: quiz.EXP,
            questions: quiz.questions,
            answers: quiz.answers
        });
    }

    handleDelete = async e => {
        e.preventDefault();
        await this.context.deleteQuiz(this.state.id);
        document.location.href = "/";
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        const { getQuizzes } = this.context;
        this.getItem(id, getQuizzes);
    }
    render(){
        //const [answerList, setAnswerList] = useState([{answer: ""}]);
        //const [questionList, setQuestionList] = useState([{question: ""}]);        
        
/*
        //updateQuiz({quizId: id, userId, name, description, likes, created, EXP, questions});
        const handleAddAnswer = () => {
            setAnswerList([...answerList, { answer: "" }]);
            currentQuiz.answers = [...currentQuiz.answers, ""];

        }
        const handleAnswerRemove = item => {
            const list = [...answerList];
            if(list.length > 1){list.splice(item, 1);}
            setAnswerList(list);
        }
        const handleAddQuestion = () => {
            setQuestionList([...questionList, { question: "" }]);
            currentQuiz.questions = [...currentQuiz.questions, ""];
        }
        const handleQuestionRemove = item => {
            const list = [...questionList];
            if(list.length > 1){list.splice(item, 1);}
            setQuestionList(list);
        }
        const nameHandler = (e) => {
            currentQuiz.name = e.target.value;
            //console.log(currentQuiz);
        }
        const descriptionHandler = (e) => {
            currentQuiz.description = e.target.value;
            //console.log(currentQuiz);
        }
        const questionHandler = (e) => {
            const l = currentQuiz.questions.length;
            if (l != 1 ){
                currentQuiz.questions[l-1] = e.target.value;
            }
            else{
                currentQuiz.questions[0] = e.target.value;
            }
            
            console.log(currentQuiz.questions);
        }
        const answerHandler = (e) => {
            const l = currentQuiz.answers.length;
            if (l != 1 ){
                currentQuiz.answers[l-1] = e.target.value;
            }
            else{
                currentQuiz.answers[0] = e.target.value;
            }
            console.log(currentQuiz.answers);
        }
        const timedHandler = () => {
            currentQuiz.timed = !currentQuiz.timed;
        }
        const retakeHandler = () => {
            currentQuiz.retake = !currentQuiz.retake;
        }
        const showQHandler = () => {
            currentQuiz.showQuestion = !currentQuiz.showQuestion;
        }
        const showAHandler = () => {
            currentQuiz.showAnswer = !currentQuiz.showAnswer;
        }
        const handleSave = async e => {
            e.preventDefault();
            console.log("current quiz: ", currentQuiz);
            const publishQuiz = {
                id: currentQuiz._id, 
                userId: currentQuiz.userId,
                name: currentQuiz.name,
                description: currentQuiz.description,
                timed: currentQuiz.timed, 
                retake: currentQuiz.retake, 
                showQuestion: currentQuiz.showQuestion, 
                showAnswer: currentQuiz.showAnswer,
                likes: currentQuiz.likes,
                created: currentQuiz.created,
                EXP: currentQuiz.EXP,
                questions: currentQuiz.questions,
                answers: currentQuiz.answers}
            updateQuiz(publishQuiz);
        }*/

            return(
                <div className="row section" style={{padding: '35px'}}>                
                    <div className="col s6">
                        <div className="section input-field">Quiz Name
                            <input id="quiz_name" type="text" className="validate" placeholder="Quiz Name" defaultValue={this.state.name}/>
                        </div>
                        <div className="section input-field">Description
                        <textarea id="textarea1" className="materialize-textarea" placeholder="This is about" defaultValue={this.state.description}></textarea>
                        </div>
                    </div>
                    <div className="col s6" style={{paddingLeft: '100px', paddingTop: '30px'}}>
                        <form action="#">
                            <p>
                                <label>
                                    <input type="checkbox" className="filled-in" defaultChecked={this.state.timed}/>
                                    <span>Timed quiz</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" className="filled-in" defaultChecked={this.state.retake}/>
                                    <span>Allow retake</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" className="filled-in" defaultChecked={this.state.showQuestion}/>
                                    <span>Show questions one at a time</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" className="filled-in" defaultChecked={this.state.showAnswer}/>
                                    <span>Show answer after submission</span>
                                </label>
                            </p>
                        </form>
                    </div>
                    
                    <div className="section col s12" style={{padding: "20px"}}>
                            <div className="col s4">
                                <a className="waves-effect waves-light btn-small" style={{margin: "5px"}}>Undo</a>
                                <a className="waves-effect waves-light btn-small" style={{margin: "5px"}}>Redo</a>
                            </div>
                            <div className="col s4">
                                <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} ><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} ><i className="material-icons">remove</i></button>
                            </div>
                            <div className="col s4">
                                <a className="waves-effect waves-light btn-small" style={{margin: "5px"}}>Save</a>
                                <a className="waves-effect waves-light btn-small" style={{margin: "5px"}} >Publish</a>
                                <button className="waves-effect waves-light btn-small red" style={{margin: "5px"}} onClick={this.handleDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                </div>
            )
    }
}

export default withRouter(EditQuizContent);