import React from 'react';
import Product from './Product';

import { sortByCompany, checkForCompetitor } from '../data';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onProductClick = (e, p) => {
    console.log(p);
    const results = sortByCompany(p.summary.skuId);
    console.log(results);
    const discounted = checkForCompetitor(this.props.formData.competitor, results, p.priceBlock.itemPrice.currentPrice);
    console.log("discounted");
    console.log(discounted);
    this.props.onFinish(discounted);
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