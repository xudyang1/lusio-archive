import React, { Component } from 'react';
import { withRouter } from "react-router";
import { QuizzesContext } from "../../context/QuizState";
import { createRef } from 'react';

class EditQuizContent extends Component {
    static contextType = QuizzesContext;

    constructor() {
        super();
        this.state = {
            id: "",
            userId: "",
            name: "",
            author: "",
            quizImgURI: "",
            description: "",
            timedOption: false,
            time: 0,
            showAnsOption: false,
            questions: [{
                title: "",
                choices: [""],
                answerKey: 1,
                score: 0
            }],
            likes: 0,
            plays: 0,
            isPublished: false,
            publishText: "PUBLISH"
        };
        this.changedImgURI = createRef(this.state.quizImgURI);
    }

    checkURI = (e) => {
        if (this.changedImgURI.current.value.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            this.setState({quizImgURI: this.changedImgURI.current.value});
        }
        else {
            if (e.key == "Enter"){
                alert("Type in a correct image URL format (jpeg/jpg/gif/png)");
            }
        }
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
        if(quiz.isPublished){
            this.setState({
                id: quiz._id,
                userId: quiz.userId,
                name: quiz.name,
                author: quiz.author,
                quizImgURI: quiz.quizImgURI,
                description: quiz.description,
                timedOption: quiz.timedOption,
                time: quiz.time,
                showAnsOption: quiz.showAnsOption,
                questions: quiz.questions, 
                likes: quiz.likes,
                plays: quiz.plays,
                isPublished: quiz.isPublished,
                publishText: "UNPUBLISH"
            });
        }
        else{
            this.setState({
                id: quiz._id,
                userId: quiz.userId,
                name: quiz.name,
                author: quiz.author,
                quizImgURI: quiz.quizImgURI,
                description: quiz.description,
                timedOption: quiz.timedOption,
                time: quiz.time,
                showAnsOption: quiz.showAnsOption,
                questions: quiz.questions, 
                likes: quiz.likes,
                plays: quiz.plays,
                isPublished: quiz.isPublished,
                publishText: "PUBLISH"
            });
        }
    }
    
    handleDeleteIndQuiz = async e => {
        e.preventDefault();
        await this.context.deleteQuiz(this.state.id);
        document.location.href = "/";
    }
    
    //remove Quiz from userProfile db
    handleDelete = (e) => {
        e.preventDefault();
        //Usage of multiple contexts in extended Component
        //updateProfile = passedFunc 
        this.props.updateProfile({
            mode: "DELETE",
            profile:{
                owner: this.state.userId,
                quizzesCreated: this.state.id
            }
        })

        //Delete independent Quiz db
        this.handleDeleteIndQuiz(e);
    }

    nameHandler = (e) => {
        this.setState({ name: e.target.value });
    }
    descriptionHandler = (e) => {
        this.setState({ description: e.target.value });
    }


    handleAddAnswer = (qi, item) => {
        let list = [...this.state.questions];
        let newItem = { ...list[qi] };
        newItem.choices.push({ content: "" });
        list[qi] = newItem;
        this.setState({ questions: list });
    }
    handleAnswerRemove = (qi, item) => {
        let list = [...this.state.questions];
        let oldItem = { ...list[qi] };
        oldItem.choices.pop();
        list[qi] = oldItem;
        this.setState({ questions: list });
    }


    handleAddQuestion = () => {
        this.setState({questions: [...this.state.questions, {title: "", choices: [{content: ""}]}]});
    }
    handleQuestionRemove = () => {
        const list = [...this.state.questions];
        if(list.length > 1){ list.splice(list.length-1, 1);}
        this.setState({questions: list});
    }
    questionHandler = (qi, e) => {
        this.state.questions[qi].title = e;
    }
    answerHandler = (qi, ai, e) => {
        this.state.questions[qi].choices[ai].content = e;
    } 

    timedHandler = () => {
        this.state.timedOption = !this.state.timedOption;
        this.setState({timedOption: this.state.timedOption});
    }
    timeHandler = (e) => {
        if (this.state.timedOption){
            this.setState({time: e.target.value});
            console.log(e.target.value);
        }
        else{
            e.preventDefault();
            alert("Select Timed Option first");
            this.setState({time: 0});
        }
        
        console.log(this.state.time);
    }
    showAnsHandler = () => {
        this.state.showAnsOption = !this.state.showAnsOption;
        this.setState({showAnsOption: this.state.showAnsOption});
    }
    
    scoreHandler = (qi,e) => {
        e.preventDefault();
        this.state.questions[qi].score = Number(e.target.value);
    }
    answerKeyHandler = (qi, e) => {
        e.preventDefault();
        this.state.questions[qi].answerKey = Number(e.target.value);
    }

    /*
    //Wishlist
    showQHandler = () => {
        this.state.showQuestion = !this.state.showQuestion;
        this.setState({showQuestion: this.state.showQuestion});
    }
    */

    handleSave = async e => {
        e.preventDefault();
        console.log("current quiz publish statement: ", this.state.isPublished);
        console.log(this.state.showAnsOption);
        const { updateQuiz } = this.context;
        const updateFQuiz = {
            id: this.state.id,
            userId: this.state.userId,
            name: this.state.name,
            author: this.state.author,
            quizImgURI: this.state.quizImgURI,
            description: this.state.description,
            timedOption: this.state.timedOption,
            time: this.state.time,
            showAnsOption: this.state.showAnsOption,
            questions: this.state.questions, 
            likes: this.state.likes,
            plays: this.state.plays,
            isPublished: this.state.isPublished
        };
        updateQuiz(updateFQuiz);
        
    }
    handlePublish = (e) => {
        e.preventDefault();
        if(this.state.isPublished){
            this.setState({isPublished: false, publishText: "PUBLISH"}, () => this.handleSave(e));
        }
        else{
            this.setState({isPublished: true, publishText: "UNPUBLISH"}, () => this.handleSave(e));
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const { getQuizzes } = this.context;
        this.getItem(id, getQuizzes);
        
    }

    render(){
        var {publishText} = this.state;
            return(
                <div className="row section" style={{padding: '35px'}}>                
                    <div className="col s5">
                        <div className="section input-field">Quiz Name
                            <input id="quiz_name" type="text" className="validate" placeholder="Quiz Name" defaultValue={this.state.name} onChange={this.nameHandler}/>
                        </div>
                        <div className="section input-field">Description
                            <textarea id="textarea1" className="materialize-textarea" placeholder="This is about" defaultValue={this.state.description} onChange={this.descriptionHandler}></textarea>
                        </div>
                    </div>
                    <div className="col s4" style={{paddingLeft: '100px', paddingTop: '30px'}}>Quiz Image
                        <img src={this.state.quizImgURI} style={{width: "280px", height: "200px"}}/>
                        {/*<input type="file" onChange={this.quizImgHandler} className="filetype" id="group_image"/>*/}
                        <input type="text" id="quizImageURI" className="form-control" ref={this.changedImgURI} onChange={this.checkURI} onKeyUp={this.checkURI}/>
                    </div>
                    <div className="col s3" style={{paddingLeft: '100px', paddingTop: '30px'}}>
                        <form action="#">
                            <span>
                                <label>
                                    <input type="checkbox" key={Math.random()} className="filled-in-timed" defaultChecked={this.state.timedOption} onClick={this.timedHandler}/>
                                    <span>Timed quiz</span>
                                    <span><input id="quiz_time" defaultValue={this.state.time} onChange={(e)=>this.timeHandler(e)} type="number" value={this.state.time}/><div>seconds</div></span>
                                </label>
                            </span>
                            <span>
                                <label>
                                    <input type="checkbox" key={Math.random()} className="filled-in" defaultChecked={this.state.showAnsOption} onClick={this.showAnsHandler}/>
                                    <span>Show answer after submission</span>
                                </label>
                            </span>
                            {/*
                            //Wishlist
                            <p>
                                <label>
                                    <input type="checkbox" key={Math.random()} className="filled-in" defaultChecked={this.state.showQuestion} onClick={this.showQHandler}/>
                                    <span>Show questions one at a time</span>
                                </label>
                            </p>
                            
                             */}
                    </form>
                </div>

                {this.state.questions.map((q, qi) => {
                    return (
                        <div className="section col s12" style={{ border: '1px solid rgba(0, 0, 0, 1)', padding: '20px', margin: '10px' }}>
                            <textarea type="text" style={{ border: '1px solid rgba(0, 0, 0, 1)', padding: '10px', paddingBottom: '70px' }} placeholder="Question" onChange={(e) => this.questionHandler(qi, e.target.value)} defaultValue={q.title} />
                            <div className="col s6" style={{ padding: '20px' }}>
                                {this.state.questions[qi].choices.map((a, ai) => {
                                    return (
                                        <div className="text-box">
                                            <input name="answer" placeholder="Answer choice" onChange={(e) => this.answerHandler(qi, ai, e.target.value)} defaultValue={q.choices[ai].content} />
                                        </div>
                                    )
                                })}
                                <div className="row">
                                    <button className="btn-floating btn-small waves-effect waves-light red" style={{ margin: "5px" }} onClick={(item) => { this.handleAddAnswer(qi, item) }}><i className="material-icons">add</i></button>
                                    <button className="btn-floating btn-small waves-effect waves-light red" style={{ margin: "5px" }} onClick={(item) => { this.handleAnswerRemove(qi, item) }}><i className="material-icons">remove</i></button>
                                </div>

                            </div>

                            <div className="col s5" style={{ textAlign: 'right', padding: '30px' }}>
                                Set Score: {this.state.questions[qi].score}
                            </div>
                            <input className="col s1" onChange={(e) => this.scoreHandler(qi, e)}></input>
                            <div className="col s5" style={{ textAlign: 'right', padding: '30px' }}>
                                Set Answer: {this.state.questions[qi].answerKey}
                            </div>
                            <input className="col s1" onChange={(e) => this.answerKeyHandler(qi, e)}></input>
                        </div>
                    )
                })
                }

                <div className="section col s12" style={{ padding: "20px" }}>
                    <div className="col s4">
                        <a className="waves-effect waves-light btn-small" style={{ margin: "5px" }}>Undo</a>
                        <a className="waves-effect waves-light btn-small" style={{ margin: "5px" }}>Redo</a>
                    </div>
                    <div className="col s4">
                        <button className="btn-floating btn-large waves-effect waves-light red" style={{ margin: "5px" }} onClick={this.handleAddQuestion}><i className="material-icons">add</i></button>
                        <button className="btn-floating btn-large waves-effect waves-light red" style={{ margin: "5px" }} onClick={this.handleQuestionRemove}><i className="material-icons">remove</i></button>
                    </div>
                    <div className="col s4">
                        <div className="row">
                            <a className="waves-effect waves-light btn-small" style={{ margin: "5px" }} onClick={this.handleSave}>Save</a>
                            <a className="waves-effect waves-light btn-small" style={{ margin: "5px" }} onClick={this.handlePublish} >{publishText}</a>
                        </div>
                        <button className="waves-effect waves-light btn-small red" style={{ margin: "5px" }} onClick={this.handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(EditQuizContent);