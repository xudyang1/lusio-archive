import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { QuizzesContext } from '../../context/QuizState';
import '../../css/playquizpage.css';

class QuizAnswersContent extends Component{
    static contextType = QuizzesContext;

    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            description: "",
            questions: []
        }
    }

    routeToQuiz = (e) => {
        const id = this.props.match.params.id;
        document.location.href = "/quiz/" + id;
    }

    getItem = async (id, getQuizzes) => {
        const setCurrentQuiz = async (id) => {
            const quizzes = () => {
                return getQuizzes()
                .then(function(result){
                    return result;
                })
            }
            const quizL = await quizzes();
            const quiz = quizL.data.filter(q => q._id === id);
            return quiz[0];
        }
        const quiz = await setCurrentQuiz(id);
        this.setState({
            id: quiz._id,
            name: quiz.name,
            description: quiz.description,
            questions: quiz.questions
        });
    }
    
    componentDidMount(){
        const id = this.props.match.params.id;
        const { getQuizzes } = this.context;
        this.getItem(id, getQuizzes); 

    }
    render() {
        return (
            <div className="row">
                <div className="container" style={{ backgroundColor: 'ivory', height: "60px" }}>
                    <div>
                        <h className="quiz">{this.state.name}</h>      
                    </div>
                </div>
                <div className="col s12" >
                    <div className="quizcontent" style={{ paddingLeft: '150px', paddingTop: '30px' }}>
                        <div className="description"> Quiz Description: {this.state.description}</div>
                        {this.state.questions.map((q, qi) => {
                            return (
                                <div className="question" key={qi}>
                                    <br/>
                                    <p className="questiontitle">{q.title}</p>
                                    <div className="qpoints" >({q.score}points)</div>
                                    {this.state.questions[qi].choices.map((choice, ci) => {
                                        return (
                                            <div className="row" key={ci}>
                                                <label>
                                                    {ci == q.answerKey-1 ? <input type="checkbox" className="filled-in" value={ci+1} checked/>
                                                    : <input type="checkbox" className="filled-in" value={ci+1} disabled/>}
                                                    <span className="choices">{choice.content}</span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                        <div className='row' style={{ textAlign: "right" }}>
                            <a className="waves-effect waves-dark btn-small" onClick={this.routeToQuiz}>Return</a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(QuizAnswersContent);