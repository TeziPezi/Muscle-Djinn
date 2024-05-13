import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdFitnessCenter, MdCalendarMonth, MdOutlineHome } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import './navbar2.css'


const Navbar2 = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                        <MdOutlineHome size={30} />
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/training" className="nav-link">
                        <MdFitnessCenter size={30} />
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/calendar" className="nav-link">
                        <MdCalendarMonth size={30} />
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/history" className="nav-link">
                        <GoGraph size={30} />
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/profile" className="nav-link">
                        <CgProfile size={30} />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar2;