import React from 'react';
import { GlobalProvider } from '../../context/GlobalState';
//import AppNavbar from '../common/AppNavbar';
import HomeContent from './HomeContent';


export default function HomePage() {
    return (
        <div>
            <GlobalProvider>
                <HomeContent />
            </GlobalProvider>
        </div>
    )
}