import React from 'react';
import { AppNavBar } from './AppNavbar';
import PlatformSections from './frontpage/PlatformSections';



export default function HomePage(){
    return(
        <div>
        {/* <GlobalProvider>
          <AppNavBar />
          <QuizzesProvider>
            <div className="container">
              <QuizSections />
            </div>
          </QuizzesProvider>
        </ GlobalProvider> */
      }
        <AppNavBar/>
        <PlatformSections/>
        <PlatformSections/>
        <PlatformSections/>
        <PlatformSections/>
      </div>
    )
}