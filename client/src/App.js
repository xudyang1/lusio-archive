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
import PlatformPage from './components/platformpage/platformpage';
import AppNavbar from './components/common/AppNavbar';

function App() {
  return (
    <div>
      <AppNavbar/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/search/" component={SearchPage} />
        <Route path="/profile/:id" component={ProfilePage} />
        <Route path="/platform/:id" component={PlatformPage} />
      </Switch>
    </div>
  );

}

export default App;
