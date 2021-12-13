import React, { useContext, useEffect, useState } from "react";
import 'materialize-css';
import '../../css/frontpage.css'
import AccountProfileButton from "../common/AccountProfileButton";
import { ProfileContext } from "../../context/ProfileState";
import { AuthContext } from "../../context/AuthState";

export default function QuizCard(props) {
    const quiz = props.element? props.element : {
        name: "TEMP",
        description: "TEMP",
        _id: 0,
        userId: 0,
        quizImgURI: "https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png",
        isPublished: false,
    }
    //console.log(quiz)
    const quizName = quiz.name
    const quizDescription = quiz.description
    const quizId = quiz._id
    const userId = quiz.userId
    const img = quiz.quizImgURI

    const { getProfile } = useContext(ProfileContext)
    const [authorprofile, setProfile] = useState({})
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (userId)
            getProfile(userId, false).then(function (result) {
                //console.log("result from quizcard", result)
                setProfile(result.data.profile)
            })
    }, [props.element])

    if(quiz.isPublished || quiz.userId == user.profile)
    return (
        <div>
            {
                props.quizDeleteCallback ?
                    <a className="right btn-floating btn-small waves-effect waves-light grey" onClick={() => props.quizDeleteCallback()}><i className="material-icons">delete</i></a>
                    : <div></div>
            }
            <div className="card blue-grey darken-1" style={{opacity: quiz.isPublished? "1" : "0.5"}}>
                <div className="card-content white-text" style={{ padding: "0px", paddingTop: "24px" }}>
                    <span className="card-title center">{quizName}</span>
                    <div className="cardText" style={{ whitespace: "break-spaces", overflow: "hidden"}}>
                        <img src={img} width="200" height="200" style={{objectFit: "cover"}}/><br />
                        {quizDescription}
                    </div>
                    <div className="row" style={{ marginBottom: "0px" }}>
                        <div className="col">
                            <AccountProfileButton user={authorprofile} userId={authorprofile._id}/>
                        </div>
                    </div>
                </div>
                <div className="valign-wrapper card-action">
                    <a href={"/quiz/" + quizId} style={{ margin: "auto" }}>Play</a>
                    {
                        props.canEdit ?
                            <a href={"/edit/" + quizId} style={{ margin: "auto" }}>Edit</a>
                            : <div></div>
                    }
                </div>
            </div>
        </div>
    )
    else
    return (
        <></>
    )
}
