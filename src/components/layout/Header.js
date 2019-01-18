import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {props.branding}
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="fa fa-home" /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contacts/add">
              <i className="fa fa-plus" /> Add Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              <i className="fa fa-question" /> About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  branding: "Contact Manager"
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;
