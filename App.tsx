import React from 'react';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
}

interface CartState {
  cartItems: Product[];
}

class App extends React.Component<{}, CartState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    this.fetchCartItems();
  }

  fetchCartItems = async () => {
    try {
      const response = await axios.get('https://www.baljeetmatta.com/codequotient/Questions/getJSON');
      const cartItems: Product[] = response.data;
      this.setState({ cartItems });
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  removeFromCart = (productId: number) => {
    const updatedCartItems = this.state.cartItems.filter((item) => item.id !== productId);
    this.setState({ cartItems: updatedCartItems });
  };

  renderCartItems = () => {
    const { cartItems } = this.state;

    if (cartItems.length === 0) {
      return <p>No items in the cart.</p>;
    }

    return (
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span>
            <span>${item.price}</span>
            <button onClick={() => this.removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <div>
        <h1>Cart Items</h1>
        {this.renderCartItems()}
      </div>
    );
  }
}

export default App;



// Fetch
/*
import React, { Component } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
}

interface CartState {
  cartItems: Product[];
}

class App extends Component<{}, CartState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    this.fetchCartItems();
  }

  fetchCartItems = async () => {
    try {
      const response = await fetch('https://www.baljeetmatta.com/codequotient/Questions/getJSON');
      const cartItems: Product[] = await response.json();
      this.setState({ cartItems });
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  removeFromCart = (productId: number) => {
    const { cartItems } = this.state;
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    this.setState({ cartItems: updatedCartItems });
  };

  renderCartItems = () => {
    const { cartItems } = this.state;

    if (cartItems.length === 0) {
      return <p>No items in the cart.</p>;
    }

    return (
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span>
            <span>${item.price}</span>
            <button onClick={() => this.removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <div>
        <h1>Cart Items</h1>
        {this.renderCartItems()}
      </div>
    );
  }
}

export default App;
*/
