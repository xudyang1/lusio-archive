import './App.css';
import React from 'react';
import { AppNavbar } from './components/AppNavbar';
import Content from './components/frontpage/Content';
import { QuizSections } from './components/QuizSections';
import { QuizzesProvider } from './context/QuizState';
import { GlobalProvider } from './context/GlobalState';
import QuizCards from './components/frontpage/QuizCard';
import PlatformSections from './components/frontpage/PlatformSections';

function App() {
  return (
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
  );

}

export default App;
