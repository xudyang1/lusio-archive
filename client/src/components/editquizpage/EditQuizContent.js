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
            author: "",
            description: "",
            timedOption: false,
            time: 0,
            retakeOption: false,
            questions: [{
                title: "",
                choices: [""], 
                answerKey: 1,
                score: 0
            }], 
            likes: 0,
            plays: 0,
            isPublished: false,
            openModal: false
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
            //console.log("Quiz", quiz[0]);
            return quiz[0];
        }
        const quiz = await setCurrentQuiz(id);
        console.log("current quiz is ", quiz);
        this.setState({
            id: quiz._id,
            userId: quiz.userId,
            name: quiz.name,
            author: quiz.author,
            description: quiz.description,
            timedOption: quiz.timedOption,
            time: quiz.time,
            retakeOption: quiz.retakeOption,
            questions: quiz.questions, 
            likes: quiz.likes,
            plays: quiz.plays,
            isPublished: quiz.isPublished,
            openModal: false
        });
        console.log("quiz questions are", this.state.questions);
        console.log("current state is ", this.state);
    }
    handleDelete = async e => {
        e.preventDefault();
        await this.context.deleteQuiz(this.state.id);
        document.location.href = "/";
    }

    nameHandler = (e) => {
        this.setState({name: e.target.value});
    }
    descriptionHandler = (e) => {
        this.setState({description: e.target.value});
    }

    
    handleAddAnswer = (qi, item) => {
        let list = [...this.state.questions];
        let newItem = {...list[qi]};
        newItem.choices.push({content: ""});
        list[qi] = newItem;
        this.setState({questions: list});
    }
    handleAnswerRemove = (qi, item) => {
        //const list = [...this.state.answers];
        //if(list.length > 1){list.splice(item, 1);}
        //this.setState({answers: list});
        let list = [...this.state.questions];
        let oldItem = {...list[qi]};
        oldItem.choices.pop();
        list[qi] = oldItem;
        this.setState({questions: list});
    }
    

    handleAddQuestion = () => {
        this.setState({questions: [...this.state.questions, {title: "", choices: [{content: ""}]}]});
        console.log("Current state",this.state);
    }
    handleQuestionRemove = () => {
        const list = [...this.state.questions];
        //const alist = [...this.state.answers];
        if(list.length > 1){ list.splice(list.length-1, 1);}
        //if(list.length > 1){list.splice(item, 1); alist.splice(item, 1);}
        this.setState({questions: list});
        //this.setState({answers: alist})
    }
    questionHandler = (qi, e) => {
        this.state.questions[qi].title = e;
        console.log(this.state.questions);
        /*
        const l = this.state.questions.length;
        if (l != 1 ){
            this.state.questions[l-1] = e.target.value;
        }
        else{
            this.state.questions[0] = e.target.value;
        }
        */
    }
    answerHandler = (qi,ai,e) => {
        this.state.questions[qi].choices[ai].content = e;
        console.log(this.state.questions[qi].answers);
    }
    //+answers would be nested as it corresponds to different questions
    //so answerHandler would be changed 

    timedHandler = () => {
        this.state.timedOption = !this.state.timedOption;
        this.setState({timedOption: this.state.timedOption});
        console.log(this.state);
    }
    retakeHandler = () => {
        this.state.retakeOption = !this.state.retakeOption;
        this.setState({retakeOption: this.state.retakeOption});
        console.log(this.state);
    }
    scoreHandler = (qi,e) => {
        e.preventDefault();
        this.state.questions[qi].score = Number(e.target.value);
        console.log(this.state.questions);
    }
    answerKeyHandler = (qi,e) => {
        e.preventDefault();
        this.state.questions[qi].answerKey = Number(e.target.value);
        console.log(this.state.questions);
    }
    /*
    //Wishlist
    showQHandler = () => {
        this.state.showQuestion = !this.state.showQuestion;
        this.setState({showQuestion: this.state.showQuestion});
        //console.log(this.state);
    }
    showAHandler = () => {
        this.state.showAnswer = !this.state.showAnswer;
        this.setState({showAnswer: this.state.showAnswer});
        //console.log(this.state);
    }
    */

    handleSave = async e => {
        e.preventDefault();
        //console.log("current quiz: ", this.state);
        
        const { updateQuiz } = this.context;
        const updateFQuiz = {
            id: this.state.id,
            userId: this.state.userId,
            name: this.state.name,
            author: this.state.author,
            description: this.state.description,
            timedOption: this.state.timedOption,
            time: this.state.time,
            retakeOption: this.state.retakeOption,
            questions: this.state.questions, 
            likes: this.state.likes,
            plays: this.state.plays,
            isPublished: this.state.isPublished
        };
        updateQuiz(updateFQuiz);
        /*
        const updateFQuiz = {
            id: this.state.id, 
            userId: this.state.userId,
            name: this.state.name,
            description: this.state.description,
            timed: this.state.timed, 
            retake: this.state.retake, 
            showQuestion: this.state.showQuestion, 
            showAnswer: this.state.showAnswer,
            likes: this.state.likes,
            created: this.state.created,
            EXP: this.state.EXP,
            questions: this.state.questions,
            answers: this.state.answers,
            isPublished: this.state.isPublished    
        }
        */
        
    }
    handlePublish = (e) => {
        e.preventDefault();
        this.state.isPublished = true;
        //console.log("current quiz: ", this.state);
        
        const { updateQuiz } = this.context;
        const updateFQuiz = {
            id: this.state.id,
            userId: this.state.userId,
            name: this.state.name,
            author: this.state.author,
            description: this.state.description,
            timedOption: this.state.timedOption,
            time: this.state.time,
            retakeOption: this.state.retakeOption,
            questions: this.state.questions, 
            likes: this.state.likes,
            plays: this.state.plays,
            isPublished: this.state.isPublished
        };
        updateQuiz(updateFQuiz);
        
    }
    handleUnpublish = (e) => {
        e.preventDefault();
        this.state.isPublished = false;
        //console.log("current quiz: ", this.state);
        
        const { updateQuiz } = this.context;
        const updateFQuiz = {
            id: this.state.id,
            userId: this.state.userId,
            name: this.state.name,
            author: this.state.author,
            description: this.state.description,
            timedOption: this.state.timedOption,
            time: this.state.time,
            retakeOption: this.state.retakeOption,
            questions: this.state.questions, 
            likes: this.state.likes,
            plays: this.state.plays,
            isPublished: this.state.isPublished
        };
        updateQuiz(updateFQuiz);
    }
    
    onOpenModal = e => {
        e.preventDefault();
        this.setState({openModal: true});
    }
    onCloseModal = e => {
        e.preventDefault();
        this.setState({openModal: false});
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        const { getQuizzes } = this.context;
        this.getItem(id, getQuizzes);  
    }
    

    render(){
            return(
                <div className="row section" style={{padding: '35px'}}>                
                    <div className="col s6">
                        <div className="section input-field">Quiz Name
                            <input id="quiz_name" type="text" className="validate" placeholder="Quiz Name" defaultValue={this.state.name} onChange={this.nameHandler}/>
                        </div>
                        <div className="section input-field">Description
                        <textarea id="textarea1" className="materialize-textarea" placeholder="This is about" defaultValue={this.state.description} onChange={this.descriptionHandler}></textarea>
                        </div>
                    </div>
                    <div className="col s6" style={{paddingLeft: '100px', paddingTop: '30px'}}>
                        <form action="#">
                            <p>
                                <label>
                                    <input type="checkbox" key={Math.random()} className="filled-in" defaultChecked={this.state.timedOption} onClick={this.timedHandler}/>
                                    <span>Timed quiz</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" key={Math.random()} className="filled-in" defaultChecked={this.state.retakeOption} onClick={this.retakeHandler}/>
                                    <span>Allow retake</span>
                                </label>
                            </p>
                            {/*
                            //Wishlist
                            <p>
                                <label>
                                    <input type="checkbox" key={Math.random()} className="filled-in" defaultChecked={this.state.showQuestion} onClick={this.showQHandler}/>
                                    <span>Show questions one at a time</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" key={Math.random()} className="filled-in" defaultChecked={this.state.showAnswer} onClick={this.showAHandler}/>
                                    <span>Show answer after submission</span>
                                </label>
                            </p>
                             */}
                        </form>
                    </div>
                    
                    {this.state.questions.map((q, qi) => {
                        return(
                            <div className="section col s12" style={{border: '1px solid rgba(0, 0, 0, 1)', padding: '20px', margin: '10px'}}>
                                <textarea type="text" style={{border: '1px solid rgba(0, 0, 0, 1)', padding: '10px', paddingBottom: '70px'}} placeholder="Question" onChange={(e) => this.questionHandler(qi, e.target.value)} defaultValue={q.title}/>
                                <div className="col s6" style={{padding: '20px'}}>
                                {this.state.questions[qi].choices.map((a,ai)=> {
                                    return (
                                        <div className="text-box">
                                            <input name="answer" placeholder="Answer choice" onChange={(e) => this.answerHandler(qi, ai, e.target.value)} defaultValue={q.choices[ai].content}/>
                                        </div>
                                    )
                                })}
                                <div className="row">
                                    <button className="btn-floating btn-small waves-effect waves-light red" style={{margin: "5px"}} onClick={(item) => {this.handleAddAnswer(qi, item)}}><i className="material-icons">add</i></button>
                                    <button className="btn-floating btn-small waves-effect waves-light red" style={{margin: "5px"}} onClick={(item) => {this.handleAnswerRemove(qi, item)}}><i className="material-icons">remove</i></button>
                                </div>
                                
                                </div>
                                
                                <div className="col s5" style={{textAlign: 'right', padding: '30px'}}>
                                    Set Score: {this.state.questions[qi].score}
                                </div>
                                <input className="col s1" onChange={(e)=> this.scoreHandler(qi,e)}></input>
                                <div className="col s5" style={{textAlign: 'right', padding: '30px'}}>
                                    Set Answer: {this.state.questions[qi].answerKey}
                                </div>
                                <input className="col s1" onChange={(e)=> this.answerKeyHandler(qi,e)}></input>
                            </div>
                        )})
                    }
                    
                    <div className="section col s12" style={{padding: "20px"}}>
                            <div className="col s4">
                                <a className="waves-effect waves-light btn-small" style={{margin: "5px"}}>Undo</a>
                                <a className="waves-effect waves-light btn-small" style={{margin: "5px"}}>Redo</a>
                            </div>
                            <div className="col s4">
                                <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={this.handleAddQuestion}><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={this.handleQuestionRemove}><i className="material-icons">remove</i></button>
                            </div>
                            <div className="col s4">
                                <div className="row">
                                    <a className="waves-effect waves-light btn-small" style={{margin: "5px"}} onClick={this.handleSave}>Save</a>
                                    <a className="waves-effect waves-light btn-small" style={{margin: "5px"}} onClick={this.handlePublish} >Publish</a>
                                    <a className="waves-effect waves-light btn-small" style={{margin: "5px"}} onClick={this.handleUnpublish} >Unpublish</a>
                                </div>
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