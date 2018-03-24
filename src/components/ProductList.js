import React from 'react';
import Product from './Product';

export default class ProductList extends React.Component {
  render() {
    const products = [1, 2, 3, 4, 5];
    return (
      <div>
        {
          products.map((i) => <Product key={i} index={i} />)
        }
      </div>
    );
  }
}