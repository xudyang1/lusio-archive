import './css/App.css';
import { Route, Switch } from "react-router-dom";
import HomePage from './components/frontpage/HomePage';
import SearchPage from './components/searchpage/SearchPage';
import ProfilePage from './components/profilepage/ProfilePage';
import PlatformPage from './components/platformpage/PlatformPage';
import QuizPage from './components/quizpage/QuizPage';
import EditQuizPage from './components/editquizpage/EditQuizPage';
import PlayQuizPage from './components/playquizpage/PlayQuizPage';
import QuizAnswersPage from './components/playquizpage/QuizAnswersPage';
import AppNavbar from './components/common/AppNavbar';
import { AuthProvider } from './context/AuthState';
import { ProfilesProvider } from './context/ProfileState';
import { QuizzesProvider } from './context/QuizState';
import { PlatformProvider } from './context/PlatformState';
import Footer from './components/common/Footer';
import AdminControl from './components/frontpage/AdminControl';

function App() {
    return (
        <AuthProvider>
            <ProfilesProvider>
                <AppNavbar />
                <QuizzesProvider>
                    <PlatformProvider>
                        <Switch>
                            <div className='mainContent'>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/quiz/:id" component={QuizPage} />
                            <Route path="/edit/:id" component={EditQuizPage} />
                            <Route path="/play/:id" component={PlayQuizPage} />
                            <Route path="/answers/:id" component={QuizAnswersPage} />
                            <Route path="/search/:key" component={SearchPage} />
                            <Route path="/profile/:id" component={ProfilePage} />
                            <Route path="/platform/:id" component={PlatformPage} />
                            <Route path="/admin" component={AdminControl} />
                            </div>
                        </Switch>
                    </PlatformProvider>
                </QuizzesProvider>
                <Footer/>
            </ProfilesProvider>
        </AuthProvider>
    );
}

export default App;
