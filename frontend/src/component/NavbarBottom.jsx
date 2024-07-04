import React from 'react';
import { NavLink } from "react-router-dom"
import styled from 'styled-components';
import { MdFitnessCenter, MdCalendarMonth, MdOutlineHome } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 10%;
  z-index: 1000;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 0.3rem;

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #c80000;
    }
  }
`;

const NavbarBottom = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink to="/"><MdOutlineHome size={30}/></NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/training"><MdFitnessCenter size={30}/></NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/calendar"><MdCalendarMonth size={30}/></NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/history"><GoGraph size={30}/></NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/settings"><IoMdSettings size={30}/></NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default NavbarBottom;