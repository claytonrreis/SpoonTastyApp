import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import "./NavBar.css";

function NavBar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <nav className="nav">
      <a href="/" className="siteTitle">
        SpoonTasty <i className="fa-solid fa-spoon"></i>
      </a>
      <ul>
        <li>
          <Hamburger toggled={isOpen} toggle={setOpen} />
          {isOpen && (
            <ul className="dropdown-menu">
              <li>
                <a href="/signin">Home</a>
              </li>
              <li>
                <a href="/About">About</a>
              </li>
              <li>
                <a href="/signin">Sing In</a>
              </li>
              <li>
                <a href="/signup">Sing Up</a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
