import React from 'react';

export default class ProductForm extends React.Component {
  render() {
    return (
      <form className="m-3">
        <div className="form-group">
          Product Name
          <input id="email" type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="form-group">
          Price
          <input id="email" type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="form-group">
          Competitor
          <select className="form-control">
            <option>Amazon</option>
            <option>Toys R Us</option>
            <option>Walmart</option>
            <option>Staples</option>
          </select>
        </div>
      </form>
    );
  }
}