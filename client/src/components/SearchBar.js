import React from 'react';




const SearchBar = () => (
    <form action="http://localhost:3000/search" method="GET">
        <div className="input-field">
            <input id="search" type="search" name="search" placeholder="SEARCH"/>
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            <i className="material-icons">close</i>
        </div>
    </form>
    
);

export default SearchBar;