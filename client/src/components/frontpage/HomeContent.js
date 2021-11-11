import React, { Component, useContext, useEffect } from "react";
//import PlatformSections from "./PlatformSections";
import DailyChallengeSection from "./DailyChallengeSection";
import {CreateQuizButton} from "../editquizpage/CreateQuizButton";
import 'materialize-css';
import '../../css/frontpage.css'
import GeneralSections from "../common/GeneralSections";
import { QUIZ_CARD } from "../../types/cardTypes";
import { GlobalContext } from "../../context/GlobalState";


export default function HomeContent() {
    var tempPlatform = ["MoMA", "Motion Pictures", "NASA", "NYC Dept of Edu", "ABCD"];
    const { platforms, dailyChallenge, getPlatforms } = useContext(GlobalContext)
    
    useEffect(() => {
        getPlatforms();
    })
  
    return (
        <div>
            <CreateQuizButton/>
            <DailyChallengeSection/>
            <div className="container">
                {
                    // replace tempPlatform with platforms when finished
                    tempPlatform.map((element, index) => (
                        <GeneralSections key={index} name={element} type={QUIZ_CARD} options={index} id={index}/>
                    ))
                }
            </div>
        </div>
    )
}