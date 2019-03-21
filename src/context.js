import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const Context = React.createContext();
//Prov
//Consum

class Provider extends Component {
  state = {
    products: [],
    details: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const prod = { ...item };
      tempProducts = [...tempProducts, prod];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = id => {
    return this.state.products.find(item => item.id === id);
  };

  handleDetail = id => {
    const prod = this.getItem(id);
    console.log(prod);
    this.setState(() => {
      return { details: prod };
    });
    console.log("handle detail");
  };
  addToCart = id => {
    console.log("add to Cart", id);
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const prod = tempProducts[index];
    prod.inCart = true;
    prod.count = 1;
    const price = prod.price;
    prod.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, prod] };
      },
      () => {
        console.log("open modal");
        // this.openModal(id);
        this.addTotal();
      }
    );
  };

  openModal = id => {
    console.log("open modal");
    const prod = this.getItem(id);
    this.setState(() => {
      return { modalProduct: prod, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = id => {
    let tempCart = [...this.state.cart];
    const selected = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selected);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotal();
      }
    );
  };
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selected = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selected);
    const product = tempCart[index];

    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotal();
        }
      );
    }
  };
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotal();
      }
    );
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotal();
      }
    );
  };
  addTotal = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = Number.parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubtotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

const Consumer = Context.Consumer;

export { Provider, Consumer };
