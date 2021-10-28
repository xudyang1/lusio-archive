import React from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import { AppNavBar } from './AppNavbar';



const SearchPage = () => {
    const {url, path } = useRouteMatch();
    return(
        <div>
            <AppNavBar/>
            <p>
                hi
            </p>
        </div>
    )
}

export default SearchPage;