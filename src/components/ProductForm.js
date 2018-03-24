import React from 'react';

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      email: '',
      price: '',
      competitor: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log(this.state);
  }

  render() {
    return (
      <form className="m-3" onSubmit={this.handleSubmit}>
        <div className="form-group">
          Product Name
          <input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} id="email" type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="form-group">
          Price
          <input value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} id="price" type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="form-group">
          Competitor
          <select value={this.state.competitor} onChange={(e) => this.setState({ competitor: e.target.value })} className="form-control">
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