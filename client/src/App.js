import './App.css';
import React from 'react';
import { AppNavBar } from './components/AppNavbar';
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
      <AppNavBar/>
      <PlatformSections/>
      <PlatformSections/>
      <PlatformSections/>
      <PlatformSections/>
    </div>
  );

}

export default App;
