import React from "react";
import "./Footer.css";
import whiteLogo from "../../../images/whiteLogo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="container-fluid footer"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <div className="leftContent d-flex">
              <img src={whiteLogo} alt="Logo" />
              {/* <h3>NOTES_UNIVERSE</h3> */}
              <NavLink to="/contact">
                <button className="btn btn-success ms-4">Connect Admin</button>
              </NavLink>
            </div>
            <p className="mt-5">© 2021 Notes Universe. All rights reserved.</p>
          </div>
          <div className="col-md-6">
            <div className="rightContent">
              <p>More From Notes Universe</p>
              <div className="d-flex">
                <div>
                  <p>
                    <NavLink to="/">Home</NavLink>
                  </p>
                  <p>
                    <NavLink to="#">About Us</NavLink>
                  </p>
                  <p>
                    <NavLink to="/search_notes">Search Notes</NavLink>
                  </p>
                  <p>
                    <NavLink to="/upload_notes">Upload Notes</NavLink>
                  </p>
                </div>
                <div className="ps-4 mobileMargin">
                  <p>Career</p>
                  <p>Privacy</p>
                  <p>Terms & Conditions</p>
                </div>
                <div className="ps-4 mobileMargin">
                  <p>Endrosments</p>
                  <p>
                    <NavLink to="/contact">Contact Admin</NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
