import React, { Component } from "react";
import { Consumer } from "../context";
import { Link } from "react-router-dom";

export default class Modal extends Component {
  state = {};
  render() {
    return (
      <Consumer>
        {value => {
          const { closeModal, modalOpen } = value;
          const { price, title, img } = value.modalProduct;
          if (!modalOpen) {
            return null;
          } else {
            return (
              <div className="modal-container">
                <div className="container">
                  <div className="row">
                    <div
                      id="modal"
                      className="p-5 col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize"
                    >
                      <h5>Item added to cart</h5>
                      <img src={img} className="img-fluid" alt="product" />
                      <h5>{title}</h5>
                      <h6>
                        <span>$</span>
                        {price}
                      </h6>
                      <div className="btn-container">
                        <Link to="/" className="continue-shop">
                          <button onClick={() => closeModal()}>
                            Continue Shopping
                          </button>
                        </Link>
                        <Link to="/cart" className="view-cart">
                          <button onClick={() => closeModal()}>
                            View Cart
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        }}
      </Consumer>
    );
  }
}
