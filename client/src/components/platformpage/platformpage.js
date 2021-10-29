import React from 'react';
import { AppNavbar } from '../common/AppNavbar';
import PlatformHeader from './PlatformHeader';
import GeneralSections from '../common/GeneralSections';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';

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


    return(
    <div>
        <AppNavbar/>
        <div className="container z-depth-3">
            <PlatformHeader name={name}/>
            <div className="center-align"><img className="responsive-img" src={img}/></div>
            {
                sections.map((element, index)=>(
                    <GeneralSections name={element[0]} quiz={element.slice(1, element.length)}/>
                ))
            }
        </div>
    </div>
    )
}