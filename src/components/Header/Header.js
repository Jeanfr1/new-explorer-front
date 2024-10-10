import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">News Explorer</div>
      <Navigation />
    </header>
  );
}

export default Header;
