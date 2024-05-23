import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/header';
import NavbarBottom from './component/NavbarBottom';
import './styles.css'

import Home from './pages/home';
import Training from './pages/training';
import MonthlyCalendar from './pages/monthlyCalendar';
import History from './pages/history';
import Settings from './pages/settings';
import NoPage from './pages/NoPage';
import Login from './pages/loginForm';
import Signup from './pages/Signup';



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
                    <Route path="/calendar" element={<MonthlyCalendar/>} />
                    <Route path="/history" element={<History/>} />
                    <Route path="/settings" element={<Settings/>} />
                    <Route path="/loginForm" element={<Login/>} />
                    <Route path="/Signup" element={<Signup/>} />
                    <Route path="*" element={<NoPage/>} />
                </Routes>
            </React.Fragment>
        </Router>
    )
}

export default App;