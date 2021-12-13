import { useEffect } from 'react'
import '../../css/section.css'
import ConfirmModal from '../common/ConfirmModal'

export default function AdjustableQuizCard(props) {
    const position = props.position
    const quiz = props.quizData? props.quizData : {
        name: "UNDEF",
        author: "UNDEF",
        likes: 0,
        platform_id: 0
    }
    const moveUp = props.moveUp
    const moveDown = props.moveDown

    const moveTop = props.moveTop
    const moveBot = props.moveBot

    const deleteQuiz = props.delete
    var end = props.end

    useEffect(() => {
        end = props.end
        //console.log(props.end)
    })

    return (
        <div className="row z-depth-3">
            <div className="col s10">
                <div className="col s1">{position}</div>
                <div className="col s3">Name: {quiz.name}</div>
                <div className="col s2">Author: {quiz.author}</div>
                <div className="col s2">Likes: {quiz.likes}</div>
                <div className="col s2">PlatformID: {quiz.platform_id}</div>
                {/* <div className="col">Date: {quiz.created.toString()}</div> */}
            </div>
            <div
                className="valign-wrapper right">
                {position == 0 ? <a className="right btn-floating btn-small waves-effect waves-light grey disabled"><i className="material-icons">vertical_align_top</i></a> :
                    <a className="right btn-floating btn-small waves-effect waves-light blue"><i className="material-icons" onClick={() => moveTop(position)}>vertical_align_top</i></a>}

                {position == end ? <a className="right btn-floating btn-small waves-effect waves-light grey disabled"><i className="material-icons">vertical_align_bottom</i></a> :
                    <a className="right btn-floating btn-small waves-effect waves-light blue"><i className="material-icons" onClick={() => moveBot(position)}>vertical_align_bottom</i></a>}

                {position == 0 ? <a className="right btn-floating btn-small waves-effect waves-light grey disabled"><i className="material-icons">expand_less</i></a> :
                    <a className="right btn-floating btn-small waves-effect waves-light blue"><i className="material-icons" onClick={() => moveUp(position)}>expand_less</i></a>}

                {position == end ? <a className="right btn-floating btn-small waves-effect waves-light grey disabled"><i className="material-icons">expand_more</i></a> :
                    <a className="right btn-floating btn-small waves-effect waves-light blue"><i className="material-icons" onClick={() => moveDown(position)}>expand_more</i></a>}

                <ConfirmModal
                    id={"removeFromSection" + quiz.id}
                    msgTitle={"Confirm Delete Section"}
                    msgBody={"This Action is Irreversible, Are you sure you want to delete?"}
                    callback={() => deleteQuiz(position)}
                    button={<a className="right btn-floating btn-small waves-effect waves-light red modal-trigger" href={"#" + "removeFromSection" + quiz.id + "confirmModal"} style={{ fontSize: "0em" }} ><i className="material-icons">delete</i></a>} />
                {/* <a className="right btn-floating btn-small waves-effect waves-light grey" onClick={() => deleteQuiz(position)}><i className="material-icons">delete</i></a> */}
            </div>
        </div>
    )
}