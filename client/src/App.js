import './App.css';
import React from 'react'
import {AppNavBar} from './components/AppNavbar';
import {QuizSections} from './components/QuizSections';
import {QuizzesProvider} from './stores/QuizStore';

function App() {
  return (
    <QuizzesProvider>
      <AppNavBar/>
      <div className="container">
        <QuizSections/>
      </div>
    </QuizzesProvider>
  );
  
}

export default App;
