import React from 'react';
import { AppNavbar } from './AppNavbar';
import Content from './frontpage/Content';



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
      </ GlobalProvider> */}
      <AppNavbar/>
      <Content/>
    </div>
    )
}