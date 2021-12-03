export default function AchievementCard() {
    return (
        // <div className="col s3">
        //     <div className="card">
        //         <div className="card-content black-text">
        //             <span className="card-title truncate">Achivement Name</span>
        //         </div>
        //         <div >
        //             Achievemnt Description
        //         </div>
        //     </div>
        // </div>
        <div className="card">
            <div className="card-content black-text">
                <span className="card-title truncate"> Achievement Title</span>
            </div>
            <div >
            <img src={""} width="200" height="200" /><br />
            </div>
            <div className="valign-wrapper card-action">
                description
            </div>
        </div>
    )
}