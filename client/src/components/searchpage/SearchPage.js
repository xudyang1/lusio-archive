import React, { useContext } from 'react';
import 'materialize-css';
import { PlatformContext } from '../../context/PlatformState';
import SearchPageContent from "./SearchPageContent";

function SearchPage() {
    const { getPlatform } = useContext(PlatformContext);
    const { search } = window.location;
    const query = new URLSearchParams(search).get('search');

    return (
        <div>
            <SearchPageContent query={query} getPlatform={getPlatform}/>
        </div>
    )
}

export default SearchPage;