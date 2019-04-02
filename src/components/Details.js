import React, { Component } from "react";
import { Consumer } from "../context";
import { Link } from "react-router-dom";

export default class Details extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart
          } = value.details;

          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto text-center my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid" alt="prod" />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3">
                  <h2>model: {title}</h2>
                  <h4 className=" text-muted mt-3 mb-2">
                    Manufacturer:{" "}
                    <span className="text-uppercase">{company}</span>
                  </h4>
                  <h5>
                    Price: <span>$</span>
                    {price}
                  </h5>
                  <p className="text-muted lead">{info}</p>
                  <div>
                    <Link to="/">
                      <button className="inner-btn">Back</button>
                    </Link>
                    <button
                      className="add-cart-btn-details inner-btn"
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? (
                        <p className="text-capitalizes mb-0" disabled>
                          in Cart
                        </p>
                      ) : (
                        <p className="text-capitalizes mb-0">
                          <i className="fa fa-cart-plus" />
                          Add to Cart
                        </p>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
