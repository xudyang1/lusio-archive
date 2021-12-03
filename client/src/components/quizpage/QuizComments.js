import React, { Component } from 'react';
import { withRouter } from "react-router";
import { QuizzesContext } from '../../context/QuizState';
import { AuthContext } from "../../context/AuthState";
import '../../css/quizcomments.css'


class QuizComments extends Component{    
    static contextType = QuizzesContext;

    constructor(){
        super();
        this.state = {
            quizId: "",
            currUserId: "",
            currUserName: "",
            commentValue: "",
            comments: [{
                id: "",
                userId: "",
                userName: "",
                text: ""
            }],
            //showComments: false
            userId: "",
            isPublished: false
        };
                
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
            quizId: quiz._id,
            comments: quiz.comments,
        });
    }
    getUser = async (user) => {
        this.setState({
            currUserId: user.id,
            currUserName: user.name
        })
    }

    handleChange = (e) => {
        this.setState({commentValue: e.target.value});
        console.log("USER: " + this.state.currUserId + " " + this.state.currUserName);
    }
    handleSubmit = async e => {
        console.log(this.props.userId);
        e.preventDefault();
        let list = [...this.state.comments];
        list.push({
            id: this.state.comments.length,
            userId: this.props.userId,
            userName: this.props.userName,
            text: this.state.commentValue
        });

        this.setState({comments: list}, () => this.handleSave(e));
    }
    handleSave = async e => {
        e.preventDefault();
        const {updateQuiz, getCommentById} = this.context;
        const updateFQuiz = {
            id: this.state.quizId,
            comments: this.state.comments
        }
        updateQuiz(updateFQuiz);

        getCommentById(this.state.quizId).then(commentId => {
            //update Profile
            this.props.passedFunc({
                mode: "ADD",
                profile:{
                    owner: this.props.userId,
                    commentsCreated: commentId
                }
            });
            /*
            const lastInd = this.state.comments.length - 1;
            const comment = this.state.comments[lastInd];
            const commentUpdate = {
                id: result,
                userId: comment.userId,
                userName: comment.userName,
                text: comment.commentValue
            }
            this.state.comments.splice(lastInd, 0, commentUpdate);

            const updateAfterComment = {
                id: this.state.quizId,
                comments: this.state.comments
            }
            updateQuiz(updateAfterComment);
            */
            //this.setState({id: result}, ()=>console.log("Comment Id",this.state.commentValue) );
        });
        
    }

    handleDeleteComment = (e, id) => {
        const {getCommentById} = this.context;
        
        getCommentById(this.state.quizId).then(result => {
            //update Profile
            this.props.passedFunc({
                mode: "DELETE",
                profile:{
                    owner: this.props.userId,
                    commentsCreated: result
                }
            });
        });
        
        let list = [...this.state.comments];
        list = list.filter(list => list.id !== id);
        this.setState({comments: list}, () => this.handleSave(e));
    }



    componentDidMount(){
        const id = this.props.match.params.id;
        const {getQuizzes} = this.context;
        this.getItem(id, getQuizzes);
    }

    render(){
        return(
            <div>
                <div className="commentSection">
                    <h5>Comments</h5>
                    <form className="commentForm" onSubmit={this.handleSubmit}>
                        <div className="commentField">
                            <div>{this.state.currUserName}</div>
                            <textarea placeholder="Comment" rows="6" required onChange={this.handleChange}></textarea>
                        </div>
                        <div>
                            <button type="submit">Post Comment</button>
                        </div>
                    </form>
                    <h6>{this.state.comments.length} Comments</h6>
                    {this.state.comments.map((c) => {
                        return(
                            <div className="commentNodes">
                                <p>{c.userName}</p>
                                <p>{c.text}</p>
                                <div>
                                    <button href="#" className="commentDelete" onClick={(e) => this.handleDeleteComment(e, c.id)}>Delete Comment</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default withRouter(QuizComments);