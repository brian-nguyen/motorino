import React from 'react';

export default class ProductValidator extends React.Component {
  render() {
    return (
      <div style={s.listContainer}>
        {this.props.success && <div className="alert alert-success" role="alert">Success!</div>}
        {!this.props.success && <div className="alert alert-danger" role="alert">{this.props.failureType}</div>}
      </div>
    );
  }
}

const s = {
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  element: {
    
  }
};