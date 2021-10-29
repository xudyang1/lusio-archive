import './App.css';
import React from 'react';
import { QuizSections } from './components/QuizSections';
import { QuizzesProvider } from './context/QuizState';
import { GlobalProvider } from './context/GlobalState';
import QuizCards from './components/frontpage/QuizCard';
import { Link, Route, Switch } from "react-router-dom";
import HomePage from './components/frontpage/HomePage';
import SearchPage from './components/searchpage/SearchPage';
import ProfilePage from './components/profilepage/ProfilePage';
import PlatformPage from './components/platformpage/PlatformPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/platform" component={PlatformPage} />
    </Switch>
  );

}

export default App;
