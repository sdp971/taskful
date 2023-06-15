/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

// eslint-disable-next-line react/prop-types
function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [burgerBar, setBurgerBar] = useState("burger-bar unclicked");

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);

    if (toggleMenu) {
      setBurgerBar("burger-bar unclicked");
    } else {
      setBurgerBar("burger-bar clicked");
    }
  };

  useEffect(() => {
    const changeWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <header>
      {(toggleMenu || width > 940) && (
        <nav>
          <div className="logo-container">
            <p className="logo-title">Taskful</p>
          </div>
          <ul className="list-items">
            <li className="items">
              <Link to="/">accueil</Link>
            </li>
            <li className="items">
              <Link to="/inscription">s'inscrire</Link>
            </li>
            <li className="items">
              <Link to="/connexion">se connecter</Link>
            </li>
          </ul>
        </nav>
      )}
      <div
        className="burger-bar-container"
        onClick={toggleNav}
        role="toolbar"
        onKeyDown={toggleNav}
      >
        <div className={burgerBar} />
        <div className={burgerBar} />
        <div className={burgerBar} />
      </div>
    </header>
  );
}

export default Navbar;
