import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { storeProducts } from "../data";
import { Consumer } from "../context";
import Carousel from "./Carousel";

export default class ProductList extends Component {
  state = {
    products: storeProducts
  };
  render() {
    return (
      <React.Fragment>
        <Carousel />
        <div className="py-5">
          <div className="container">
            <Title name="Our" title="Products" />
            <div className="row">
              <Consumer>
                {value => {
                  return value.products.map(product => {
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </Consumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
