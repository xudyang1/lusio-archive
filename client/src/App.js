import './App.css';
import React from 'react';
import { QuizSections } from './components/QuizSections';
import { QuizzesProvider } from './context/QuizState';
import { GlobalProvider } from './context/GlobalState';
import QuizCards from './components/frontpage/QuizCard';
import { Link, Route, Switch } from "react-router-dom";
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
    </Switch>
  );

}

export default App;
