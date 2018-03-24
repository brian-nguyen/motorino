import React from 'react';

export default class ProductValidator extends React.Component {
  render() {
    if (!this.props.success) {
        return (
        <div className="alert alert-danger" role="alert">{this.props.failureType}</div>
        );
    }

    return (
        <div className="alert alert-success" role="alert">Success!</div>
    );
  }
}