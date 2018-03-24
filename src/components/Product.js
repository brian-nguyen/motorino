import React from 'react';

export default class Product extends React.Component {
  render() {
    return (
      <div className="card m-2">
        <div style={s.container}>
          <img src={this.props.imageUrl} className="img-thumbnail" style={s.img} />
          <div className="card-text">
            <h5 className="m-2">{this.props.name}</h5>
            <p className="card-subtitle text-muted m-3">{this.props.description}</p>
          </div>
          <p className="text-success p-3" style={s.price}>${this.props.price}</p>
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