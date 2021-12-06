import React , { useContext, useEffect} from 'react';
import { AuthContext } from "../../context/AuthState";
import {PlatformContext} from "../../context/PlatformState";
import { ProfileContext } from '../../context/ProfileState';
import QuizPageContent from "./QuizPageContent";
import QuizComments from "./QuizComments";
import QuizReport from "./QuizReport";
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";

export default function QuizPage(){
    const {isAuthenticated, user} = useContext(AuthContext);
    const {updateProfile, getProfile} = useContext(ProfileContext);
    const {getPlatform} = useContext(PlatformContext);
    
    useEffect(() => {
        var elem = document.querySelector('#reportModal')
        var options = {
            preventScrolling: false,
        };
        M.Modal.init(elem, options);
        
    })
    return(
        <div className="container z-depth-3" >
            <div className = "row">
                <div className="col s7 push-s4">
                    <br/>
                    <a className="waves-effect waves-light btn modal-trigger col push-s8" href="#reportModal"><i className="material-icons right">report</i>Report</a>
                    <div id="reportModal" className="modal">
                        {isAuthenticated ? (
                        <div>
                            <div className="modal-content">
                                <h4>Report a Problem</h4>
                                <QuizReport/>
                            </div>
                        </div>) :
                        (<div>
                            <div className="modal-content">
                                <h4>Please login first</h4>
                            </div>
                            <div className="modal-footer">
                                <a className="modal-close waves-effect waves-blue btn-flat">OK</a>
                            </div>
                        </div>)
                        }
                    </div>
                    <br/> 
                    {isAuthenticated ? <QuizPageContent passedFuncGet={getPlatform} userId={user.profile} updateProfile={updateProfile} getProfile={getProfile}/> 
                    : <QuizPageContent passedFuncGet={getPlatform} userId="" updateProfile={updateProfile}/>}
                </div>
            </div>
            {isAuthenticated ? <QuizComments userName={user.name} userId={user.profile} passedFunc={updateProfile}/>
            : <QuizComments userName="" userId="" passedFunc={updateProfile}/>
        }
        </div>
        )
}