import React from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import { AppNavbar } from '../common/AppNavbar';



const SearchPage = () => {
    const {url, path } = useRouteMatch();
    return(
        <div>
            <AppNavbar/>
            <p>
                hi
            </p>
        </div>
    )
}

export default SearchPage;