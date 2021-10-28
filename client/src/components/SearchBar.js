import React from 'react';




const SearchBar = () => (
    <form action="http://localhost:3000/search" method="GET">
        <div class="input-field">
                <input id="search" type="search" name="search" placeholder="SEARCH"/>
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
            </div>
    </form>
);

export default SearchBar;