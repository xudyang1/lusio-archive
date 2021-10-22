import './App.css';
import React from 'react'
import {AppNavBar} from './components/AppNavbar';
// import {QuizSections} from './components/QuizSections';
// import {GlobalProvider} from './stores/GlobalStore';


function App() {
  return (
    // <GlobalProvider>
    //   <AppNavBar/>
    //   <div className="container">
    //     <QuizSections/>
    //   </div>
    // </GlobalProvider>
    <div className="App">
      <AppNavBar/>
    </div>
  );
  
}

export default App;
