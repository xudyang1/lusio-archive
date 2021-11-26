import React, { Component, useContext, useEffect } from "react";
//import PlatformSections from "./PlatformSections";
import DailyChallengeSection from "./DailyChallengeSection";
import { CreateQuizButton } from "../editquizpage/CreateQuizButton";
import 'materialize-css';
import '../../css/frontpage.css'
import GeneralSections from "../common/GeneralSections";
import { QUIZ_CARD } from "../../types/cardTypes";
import { GlobalContext } from "../../context/GlobalState";
import { PlatformContext } from "../../context/PlatformState";


export default function HomeContent() {
    var tempPlatform = ["MoMA", "Motion Pictures", "NASA", "NYC Dept of Edu", "ABCD"];
    //const { platforms, dailyChallenge, getPlatforms } = useContext(GlobalContext)
    const { getPlatformList, platformList } = useContext(PlatformContext)

    useEffect(() => {
        getPlatformList();
    }, [])

    return (
        <div>
            <CreateQuizButton />
            <DailyChallengeSection />
            <div className="container">

                {
                    // replace tempPlatform with platforms when finished
                    platformList ?
                        platformList.map((element, index) => (
                            <GeneralSections key={index} items={element.quizzes} name={element.name} type={QUIZ_CARD} id={element._id} homeContent={true} />
                        ))
                        : <div></div>
                }
            </div>
        </div>
    )
}