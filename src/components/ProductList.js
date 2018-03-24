import React from 'react';
import Product from './Product';

export default class ProductList extends React.Component {
  render() {
    const products = [1, 2, 3, 4, 5];
    return (
      <div style={s.listContainer}>
        {
          this.props.products.map((p, idx) => <Product key={idx} imageUrl={p.summary.media.primaryImage.url} name={p.summary.names.short} description={p.summary.descriptions.short} price={p.priceBlock.itemPrice.currentPrice} />)
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