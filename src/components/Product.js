import React from 'react';

export default class Product extends React.Component {
  render() {
    return (
      <div className="card m-2">
        <div className="card-body" style={s.container}>
          <img src={this.props.imageUrl} style={s.img} />
          <div className="card-text">
            <h5>{this.props.name}</h5>
            <p>{this.props.description}</p>
          </div>
          <p>{this.props.price}</p>
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
    width: 100,
    height: 100,
  }
};