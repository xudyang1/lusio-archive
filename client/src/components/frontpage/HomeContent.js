import React, { useContext, useEffect } from "react";
//import PlatformSections from "./PlatformSections";
import DailyChallengeSection from "./DailyChallengeSection";
import { CreateQuizButton } from "../editquizpage/CreateQuizButton";
import 'materialize-css';
import '../../css/frontpage.css'
import GeneralSections from "../sections/GeneralSections";
import { QUIZ_CARD } from "../../types/cardTypes";
import { PlatformContext } from "../../context/PlatformState";
import { AuthContext } from "../../context/AuthState";


export default function HomeContent() {
    var tempPlatform = ["MoMA", "Motion Pictures", "NASA", "NYC Dept of Edu", "ABCD"];
    //const { platforms, dailyChallenge, getPlatforms } = useContext(GlobalContext)
    const { getPlatformList, platformList } = useContext(PlatformContext)
    const {} = useContext(AuthContext)

    useEffect(() => {
        getPlatformList();
    }, [])

    useEffect(()=>{
        if(true){
            window.location = '/suspended';
        }
    }, [])

    return (
        <div>
            <CreateQuizButton />
            {/* <DailyChallengeSection /> */}
            <div className="container">
            <script>{console.log(platformList)}</script>
                {
                    // replace tempPlatform with platforms when finished
                    platformList ?
                        platformList.map((element, index) => (
                            <GeneralSections key={index} element={element.quizzes} name={element.name} type={QUIZ_CARD} platformID={element._id} homeContent={true} />
                        ))
                        : <div></div>
                }
            </div>
        </div>
    )
}