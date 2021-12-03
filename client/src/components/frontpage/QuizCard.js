import React, { useContext, useEffect, useState } from "react";
import 'materialize-css';
import '../../css/frontpage.css'
import AccountProfileButton from "../common/AccountProfileButton";
import { ProfileContext } from "../../context/ProfileState";

export default function QuizCard(props) {
    const quiz = props.element
    //console.log(quiz)
    const quizName = quiz? quiz.name: "TEMP"
    const quizDescription = quiz? quiz.description: "TEMP"
    const quizId = quiz? quiz._id: 0
    const userId = quiz? quiz.userId: 0
    const img = quiz? quiz.quizImgURI: "https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png"

    const { getProfile } = useContext(ProfileContext)
    const [profile, setProfile] = useState({})

    useEffect(() => {
        if (userId)
            getProfile(userId, false).then(function (result) {
                //console.log("result from quizcard", result)
                setProfile(result.data.profile)
            })
    }, [])


    return (
        <div>
            {
                props.quizDeleteCallback ?
                    <a className="right btn-floating btn-small waves-effect waves-light grey" onClick={() => props.quizDeleteCallback()}><i className="material-icons">delete</i></a>
                    : <div></div>
            }
            <div className="card blue-grey darken-1">
                <div className="card-content white-text" style={{ padding: "0px", paddingTop: "24px" }}>
                    <span className="card-title center">{quizName}</span>
                    <div className="cardText" style={{ whitespace: "break-spaces" }}>
                        <img src={img} width="200" height="200" /><br />
                        {quizDescription}
                    </div>
                    <div className="row" style={{ marginBottom: "0px" }}>
                        <div className="col">
                            <AccountProfileButton user={profile} userId={profile._id}/>
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
}
