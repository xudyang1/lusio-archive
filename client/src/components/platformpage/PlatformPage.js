import React, { useContext, useEffect } from 'react';
import PlatformHeader from './PlatformHeader';
import { Route, useParams, useRouteMatch, Switch } from 'react-router-dom';
import PlatformContent from './PlatformContent';
import PlatformAbout from './PlatformAbout';
import { PlatformContext } from '../../context/PlatformState';
import { AuthContext } from '../../context/AuthState';
import M from 'materialize-css';
import { ProfileContext } from '../../context/ProfileState';

export default function PlatformPage(props) {
    const { url, path } = useRouteMatch();
    const { id } = useParams();

    const { isAuthenticated, loadUser, user } = useContext(AuthContext)
    const { platform, getPlatform, viewType } = useContext(PlatformContext)
    const { getProfile } = useContext(ProfileContext)

    useEffect(() => {
        var elems = document.querySelectorAll('.parallax');
        var instances = M.Parallax.init(elems, {});
        getPlatform(id)
        if(user)
            getProfile(user.profile)
    }, [isAuthenticated])

    return (
        <div>
            <div className="container z-depth-3">
                <PlatformHeader name={platform.name} banner={platform.bannerURI} />
                <Switch>
                    <Route exact path={url}><PlatformContent sections={platform.quizSections} auth={viewType} id={id} /></Route>
                    <Route path={url + "/About"}><PlatformAbout data={platform} id={id} /></Route>
                </Switch>
            </div>
        </div>
    )
}
