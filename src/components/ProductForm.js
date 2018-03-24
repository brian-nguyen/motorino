import React from 'react';
import { COMPANY_NAMES } from '../data'

import Ocr from './Ocr';
import Url from './Url';

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      productName: '',
      price: '',
      competitor: '',
    };
  }

  fillForm = (vals) => {
    this.setState({
      productName: vals.productName,
      price: vals.price,
      competitor: vals.competitor
    })
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <div className="m-3 card w-50" style={{ alignSelf: 'center' }}>
          <button type="button" onClick={() => window.location.reload()} className="close ml-2 mt-2" style={{ alignSelf: 'flex-start' }}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="card-body">
            <div className="alert alert-success" role="alert">Provide proof by either uploading a photo, taking a photo, or providing a link to the product page</div>
            <Ocr onSubmit={(vals) => this.fillForm(vals)}/>
            <Url onSubmit={(vals) => this.fillForm(vals)}/>
          </div>
        </div>
        <div className="card w-50" style={{ alignSelf: 'center' }}>
          <form className="m-3" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
            <p className="text-left">Product Name or MFR</p>
              <input value={this.state.productName} onChange={(e) => this.setState({ productName: e.target.value })} id="email" type="text" className="form-control" placeholder="Enter product name" />
            </div>
            <div className="form-group">
              <p className="text-left">Price</p>
              <input value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} id="price" type="text" className="form-control" placeholder="Enter price" />
            </div>
            <div className="form-group">
            <p className="text-left">Competitor</p>
              <select value={this.state.competitor} onChange={(e) => this.setState({ competitor: e.target.value })} className="form-control">
              <option></option>
                {
                  COMPANY_NAMES.map((e) => <option>{e}</option>)
                }
              </select>
            </div>
            <button onClick={() => this.props.onSubmit(this.state)} type="button" className="btn btn-outline-dark">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}