import './css/App.css';
import React, { useContext, useEffect } from 'react';
import { QuizSections } from './components/QuizSections';
import { QuizzesProvider } from './context/QuizState';
import { GlobalProvider } from './context/GlobalState';
import QuizCards from './components/frontpage/QuizCard';
import { Link, Route, Switch } from "react-router-dom";
import HomePage from './components/frontpage/HomePage';
import SearchPage from './components/searchpage/SearchPage';
import ProfilePage from './components/profilepage/ProfilePage';
import PlatformPage from './components/platformpage/PlatformPage';
import EditQuizPage from './components/editquizpage/EditQuizPage';
import AppNavbar from './components/common/AppNavbar';
import { AuthProvider } from './context/AuthState';
import { ProfilesProvider } from './context/ProfileState';
function App() {
  return (
    <AuthProvider>
      <AppNavbar />
      <Switch>
        <ProfilesProvider>
          <QuizzesProvider>
            <Route exact path="/" component={HomePage} />
            <Route path="/edit/:id" component={EditQuizPage} />
          </QuizzesProvider>
          <Route path="/search/:key" component={SearchPage} />
          <Route path="/profile/:id" component={ProfilePage} />
        </ProfilesProvider>
        <Route path="/platform/:id" component={PlatformPage} />
      </Switch>
    </AuthProvider>
  );

}

export default App;
