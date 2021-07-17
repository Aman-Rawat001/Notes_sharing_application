import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../images/logo.png";

const Navbar = () => {
  // When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      document.getElementById("navbar").style.padding = "1px 10px";
      // document.getElementById("logo").style.fontSize = "25px";
    } else {
      document.getElementById("navbar").style.padding = "10px 10px";
      // document.getElementById("logo").style.fontSize = "35px";
    }
  }

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light navigationBar"
        id="navbar"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NavLink to="/">
                <img className="logo" src={logo} alt="Logo" />
              </NavLink>
              {/* <h5 className="">NOTES_UNIVERSE</h5> */}
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse navbar_menu me-5"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="listmydiv">
              <NavLink
                activeClassName="activeLink"
                className="navbar_link"
                aria-current="page"
                exact
                to="/"
              >
                <li className="navbar_item" id="linkOne">
                  Home
                </li>
              </NavLink>
              <NavLink
                activeClassName="activeLink"
                className="navbar_link"
                exact
                to="/search_notes"
              >
                <li className="navbar_item" id="linkTwo">
                  Search Notes
                </li>
              </NavLink>
              <NavLink
                activeClassName="activeLink"
                className="navbar_link"
                to="/upload_notes"
              >
                <li className="navbar_item" id="linkThree">
                  Upload Notes
                </li>
              </NavLink>
              <NavLink
                activeClassName="activeLink"
                className="navbar_link"
                to="/contact"
              >
                <li className="navbar_item" id="linkFour">
                  Contact Admin
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
