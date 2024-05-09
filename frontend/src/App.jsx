import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar.jsx';
import HeaderLogo from './component/headerlogo.jsx';
import Training from './pages/training.jsx';
import Calender from './pages/calender';
import History from './pages/history';
import Account from './pages/account';
import './styles.css'


function App() {
    return (
        <Router>
            <React.Fragment>
                <div className='background-container'>
                </div>
                <HeaderLogo/>
                <Navbar />
                <Routes>
                    <Route exact path="/pages/training.jsx" component={Training} />
                    <Route path="/pages/calendar.jsx" component={Calender} />
                    <Route path="/pages/history.jsx" component={History} />
                    <Route path="/pages/account.jsx" component={Account} />
                </Routes>
            </React.Fragment>
        </Router>
    )
}

export default App;