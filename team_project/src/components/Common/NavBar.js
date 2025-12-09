import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: #004d40;
  color: white;
  padding: 1rem;
  display: flex;
  gap: 20px;
  font-weight: bold;
  a {
    color: white;
    text-decoration: none;
    &:hover {
      color: #a7ffeb;
    }
  }
`;

function NavBar() {
  return (
    <Nav>
      <Link to="/">Home</Link>
      <Link to="/list">Rack List</Link>
      <Link to="/my">My Page</Link>
    </Nav>
  );
}

export default NavBar;
