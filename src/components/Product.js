import React from 'react';

export default class Product extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
          <img src={this.props.imageUrl} />
          <h6 className="card-subtitle">{this.props.price}</h6>
          <p className="card-text">{this.props.description}</p>
        </div>
      </div>

    );
  }
}