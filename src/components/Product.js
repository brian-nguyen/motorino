import React from 'react';

export default class Product extends React.Component {
  render() {
    return (
      <p>Hi from Product {this.props.index}</p>
    );
  }
}