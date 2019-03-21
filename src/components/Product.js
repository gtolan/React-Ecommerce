import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../context";
import PropTypes from "prop-types";

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <div className="product-wrapper col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <Consumer>
            {value => (
              <div
                className="img-container p-5"
                onClick={() => value.handleDetail(id)}
              >
                <Link to="/details">
                  <img src={img} alt="product" className="card-img-top" />
                </Link>
                <button
                  className="add-cart-btn"
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
            )}
          </Consumer>
          <div className="card-footer d-flex justify-content-between p-3">
            <p className="align-self-center mb-0">{title}</p>
            <h5 className="mb-0">${price}</h5>
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool
  }).isRequired
};
