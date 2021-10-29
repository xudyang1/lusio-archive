import React from 'react';
import { AppNavbar } from '../AppNavbar';



export default function PlatformPage(){

    var name = "MoMA"
    return(
    <div>
        <AppNavbar/>
        <div className="container z-depth-3">
            {name}
        </div>
    </div>
    )
}