import './App.css';
import React from 'react';
import { AppNavBar } from './components/AppNavbar';
import { QuizSections } from './components/QuizSections';
import { QuizzesProvider } from './context/QuizState';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <AppNavBar />
      <QuizzesProvider>
        <div className="container">
          <QuizSections />
        </div>
      </QuizzesProvider>
    </ GlobalProvider>
  );

}

export default App;
