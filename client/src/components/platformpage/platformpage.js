import React from 'react';
//import AppNavbar from '../common/AppNavbar';
import PlatformHeader from './PlatformHeader';
import GeneralSections from '../common/GeneralSections';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import samplePlatform from '../../sampleData/samplePlatform.json';
import sampleQuiz from '../../sampleData/sampleQuiz.json'

function parseSections(sections){
    var newSections = []
    // console.log(sections)
    sections.forEach(element => {
        var quizzes = [element.sectionName]
        var qs = sampleQuiz.quizzes.filter((quiz)=>(
            element.quizzesID.includes(quiz.quizID)
        ));
        // console.log(qs)
        qs.forEach(element => {
            quizzes.push([element.quizName, element.quizDesc]);
        });
        newSections.push(quizzes);
    });
    // console.log(newSections)
    return newSections;
}

export default function PlatformPage(props){
    const {url, path } = useRouteMatch();
    const {id} = useParams();

    var name = "MoMA"
    var img = "https://robbreport.com/wp-content/uploads/2019/05/moma-pick--e1557163243773.png?w=1000"
    var sections = [
        ["section 1", ["Q1", "Description for Q1"], ["Q2", "Something Something"], ["Q3", "No Description"]], 
        ["section 2", ["Q1", "Description for Q1"], ["Q2", "Something Something"], ["Q3", "No Description"]],
        ["section 3", ["Q1", "Description for Q1"], ["Q2", "Something Something"], ["Q3", "No Description"]]
    ]

    /**
     * The Following Code will search for platforms in the sample platform data
     * Later on we will change the searching to backend.
     * We will be recieving the platform json itself, so, no need for filter
     * Var plat will contain the platform data
     * 
     */
    var plat = samplePlatform.platforms.filter((platform)=>(
        platform.platformID == id
    ))
    plat = plat[0]

    //==========================================================

    if(plat){
        name = plat.platformName;
        img = plat.platformImgURL;
        // console.log(plat.platformSections)
        sections = parseSections(plat.platformSections);
    }


    return(
    <div>
        <div className="container z-depth-3">
            <PlatformHeader name={name}/>
            <div className="center-align"><img className="responsive-img" src={img}/></div>
            {
                sections.map((element, index)=>(
                    <GeneralSections key={index} name={element[0]} items={element.slice(1, element.length)}/>
                ))
            }
        </div>
    </div>
    )
}