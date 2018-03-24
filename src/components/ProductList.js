import React from 'react';
import Product from './Product';

import { sortByCompany } from '../data';

export default class ProductList extends React.Component {
  onProductClick(e, p) {
    console.log(sortByCompany(p.summary.skuId));
  }

  render() {
    return (
      <div style={s.listContainer}>
        {this.props.products.map((p, idx) => 
          <Product
            key={idx}
            product={p}
            onClick={(e, p) => this.onProductClick(e, p)}
          />)
        }
      </div>
    );
  }
}

const s = {
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
};