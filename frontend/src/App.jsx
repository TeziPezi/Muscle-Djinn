import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Training from './pages/training';
import Calender from './pages/calender';
import History from './pages/history';
import Profile from './pages/profile';
import NoPage from './pages/NoPage';
import './styles.css'


function App() {
    return (
        <Router>
            <React.Fragment>
                <div className="background-container">
                </div>
                <Routes>
                    <Route index element={<Home/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path ="/training" element={<Training/>} />
                    <Route path="/calender" element={<Calender/>} />
                    <Route path="/history" element={<History/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="*" element={<NoPage/>} />
                </Routes>
            </React.Fragment>
        </Router>
    )
}

export default App;