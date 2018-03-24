import React from 'react';

export default class Product extends React.Component {
  render() {
    const p = this.props.product;
    const imageUrl = p.summary.media.primaryImage.url;
    const name = p.summary.names.short;
    const description = p.summary.descriptions.short;
    const price = p.priceBlock.itemPrice.currentPrice;
    return (
      <div onClick={(e) => this.props.onClick(e, this.props.product)} className="card list-group-item-action m-2">
        <div style={s.container}>
          <img src={imageUrl} className="img-thumbnail" style={s.img} alt="Product Image" />
          <div className="card-text">
            <h5 className="m-2">{name}</h5>
            <p className="card-subtitle text-muted m-3">{description}</p>
          </div>
          <p className="text-success p-3" style={s.price}>${price}</p>
        </div>
      </div>
    );
  }
}

const s = {
  container: {
    display: 'flex',
  },
  img: {
    width: 200,
    height: 200,
  },
  price: {
    width: 100,
  },
};