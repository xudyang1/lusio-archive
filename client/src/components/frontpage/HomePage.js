import React from 'react';
import { GlobalProvider } from '../../context/GlobalState';
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