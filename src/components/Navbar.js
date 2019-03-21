import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <Link to="/">
            <img className="logo-icon" src="logo.png" alt="logo" />
          </Link>
          <h4 className="nav-brand">Wearables</h4>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-5">
              <Link to="/" className="nav-link">
                Products
              </Link>
            </li>
          </ul>
          <Link to="/cart" className="ml-auto">
            <button className="cart-btn">
              <i className="fa fa-cart-plus" />
              Cart
            </button>
          </Link>
        </nav>
      </div>
    );
  }
}
