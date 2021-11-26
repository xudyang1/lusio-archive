import '../../css/section.css'

export default function AdjustableQuizCard(props) {
    const position = props.position
    const quiz = props.quizData
    const moveUp = props.moveUp
    const moveDown = props.moveDown
    const deleteQuiz = props.delete
    return (
        <div className="row z-depth-3">
            <div className="col s10">
                <div className="col s1">{position}</div>
                <div className="col s2">Name: {quiz.name}</div>
                <div className="col s2">Author: {quiz.author}</div>
                <div className="col s2">Likes: {quiz.likes}</div>
                <div className="col s2">PlatformID: {quiz.platform_id}</div>
                <div className="col">Date: {quiz.created.toString()}</div>
            </div>
            <div
                className="valign-wrapper right">
                {position == 0 ? <a className="right btn-floating btn-small waves-effect waves-light grey disabled"><i className="material-icons">expand_less</i></a> :
                    <a className="right btn-floating btn-small waves-effect waves-light blue"><i className="material-icons" onClick={()=>moveUp(position)}>expand_less</i></a>}
                {position == props.end ? <a className="right btn-floating btn-small waves-effect waves-light grey disabled"><i className="material-icons">expand_more</i></a> :
                    <a className="right btn-floating btn-small waves-effect waves-light blue"><i className="material-icons" onClick={()=>moveDown(position)}>expand_more</i></a>}
                <a className="right btn-floating btn-small waves-effect waves-light grey" onClick={()=>deleteQuiz(position)}><i className="material-icons">delete</i></a>
            </div>
        </div>
    )
}