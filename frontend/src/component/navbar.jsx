import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import '../styles.css'
import { MdFitnessCenter, MdCalendarMonth, MdOutlineHome } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { CgProfile } from "react-icons/cg";


class Navbar extends Component {
    state = {  } 
    render() { 
        return <nav className="navbar fixed-bottom bg-dark">
        <div className="container-fluid">
            <div>
            <ul>
              <li>
                <NavLink to="/"><MdOutlineHome size={30}/></NavLink>
              </li>
              <li>
                <NavLink to="/training"><MdFitnessCenter size={30}/></NavLink>
              </li>
              <li>
                <NavLink to="/calender"><MdCalendarMonth size={30}/></NavLink>
              </li>
              <li>
                <NavLink to="/history"><GoGraph size={30}/></NavLink>
              </li>
              <li>
                <NavLink to="profile"><CgProfile size={30}/></NavLink>
              </li>
            </ul>
            </div>

        </div>
      </nav>
    }
}
 
export default Navbar;