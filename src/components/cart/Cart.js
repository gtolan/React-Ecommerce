import React, { Component } from "react";
import Title from "../Title";
import { Consumer } from "../../context";
import EmptyCart from "./EmptyCart";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

export default class Cart extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { cart } = value;
          if (cart.length > 0) {
            return (
              <section>
                <Title name="Your" title="Cart" />
                <CartColumns />
                <CartList value={value} />
                <CartTotals value={value} />
              </section>
            );
          } else {
            return <EmptyCart />;
          }
        }}
      </Consumer>
    );
  }
}
