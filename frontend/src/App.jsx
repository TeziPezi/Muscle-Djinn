import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/header';
import NavbarBottom from './component/NavbarBottom';
import './styles.css'

import Home from './pages/home';
import Training from './pages/training';
import Calendar from './pages/calendar';
import History from './pages/history';
import Settings from './pages/settings';
import NoPage from './pages/NoPage';


function App() {
    return (
        <Router>
            <React.Fragment>
                <Header/>
                <NavbarBottom/>
                <Routes>
                    <Route index element={<Home/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path ="/training" element={<Training/>} />
                    <Route path="/calendar" element={<Calendar/>} />
                    <Route path="/history" element={<History/>} />
                    <Route path="/settings" element={<Settings/>} />
                    <Route path="*" element={<NoPage/>} />
                </Routes>
            </React.Fragment>
        </Router>
    )
}

export default App;