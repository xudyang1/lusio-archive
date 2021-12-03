import React, { Component } from 'react';
import { withRouter } from "react-router";
import { QuizzesContext } from '../../context/QuizState';
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
            commentId: "",
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
        e.preventDefault();

        if (this.props.userId==""){ 
            alert('You need to log in first');
        }
        else {
            let list = [...this.state.comments];
            list.push({
                id: this.state.comments.length,
                userId: this.props.userId,
                userName: this.props.userName,
                text: this.state.commentValue
            });

            this.setState({comments: list}, () => this.handleSave(e));
        }
    }
    handleSave = async e => {
        e.preventDefault();
        const {updateQuiz, getCommentById} = this.context;
        console.log(this.state.comments);
        const updateFQuiz = {
            id: this.state.quizId,
            comments: this.state.comments
        }
        await updateQuiz(updateFQuiz);

        //Get CommentId
        const getComID = () => {
            return (getCommentById(this.state.quizId)).then(function(commentId) {
                return commentId;
        }).catch((e) => console.log(e));}
        const id = await getComID();
        console.log(id);
    
        //update Profile
        this.props.passedFunc({
            mode: "ADD",
            profile:{
                owner: this.props.userId,
                commentsCreated: id
            }
        });
        //await this.handleSaveCommentId(id);
    }
    /*
    handleSaveCommentId = async (commentId) => {
        const {updateQuiz, quiz} = this.context;
        const comment = this.state.comments[this.state.comments.length-1];
        
        const commentUpdate = {
            id: commentId,
            userId: comment.userId,
            userName: comment.userName,
            text: comment.text
        }
        console.log("commentUpdate",commentUpdate);
        const tempComments = quiz.comments;
        
        tempComments[tempComments.length-1] = commentUpdate;
        
        
        const updateAfterComment = {
            id: this.state.quizId,
            comments: tempComments
        }
        console.log("updateAfterComment", updateAfterComment.comments);
        
        await updateQuiz(updateAfterComment);
    }
    /*handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });
    }*/
    handleDeleteComment = async (e, id) => {
        
        const {getCommentById, quiz} = this.context;
        
        await getCommentById(this.state.quizId).then(commentId => {
            //update Profile
            this.props.passedFunc({
                mode: "DELETE",
                profile:{
                    owner: this.props.userId,
                    commentsCreated: commentId
                }
            });
        });
        //console.log("quiz",quiz.comments[quiz.comments.length-1]._id);
        let list = [...this.state.comments];
        list = list.filter(list => list.id !== id);
        this.setState({comments: list}, () => this.handleSave(e));
    }



    componentDidMount(){
        const id = this.props.match.params.id;
        const {getQuizzes, quiz} = this.context;
        this.getItem(id, getQuizzes);
        //this.setState({commentId: quiz.comments[quiz.comments.length-1]._id})
        //this.getUser(this.props.dataFromQuizPage);
    }

    render(){/*
        let commentItems;
        let buttonView = 'Show Comments';
        
        if (this.state.showComments) {
            buttonView = 'Hide Comments';
            commentItems = <div className="commentList">{this.state.comments}</div>;
        }*/
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
                            {this.props.userId != "" ? <button type="submit">Post Comment</button>
                            :
                            null}
                        </div>
                    </form>
                    <h6>{this.state.comments.length} Comments</h6>
                    {this.state.comments.map((c) => {
                        return(
                            <div className="commentNodes">
                                <p>{c.userName}</p>
                                <p>{c.text}</p>
                                <div>
                                    {this.props.userId == c.userId ? <button href="#" className="commentDelete" onClick={(e) => this.handleDeleteComment(e, c.id)}>Delete Comment</button>
                                    :
                                    null}
                                </div>
                            </div>
                        )
                    })}
                    {/*<button onClick={this.handleClick()}>
                        {buttonView}
                    </button>
                    <h4>
                        {this.state.comments.length}
                    </h4>
                    {commentItems}*/}
                </div>
            </div>
        )
    }
}
export default withRouter(QuizComments);