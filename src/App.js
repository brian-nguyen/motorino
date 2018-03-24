import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const bbdb = require('./bbdb.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      products: [],
    };
  }

  //search BBDB finds and returns a list of objects with a SKU
  //field SKU is a number
  //other fields are strings
  searchBBDB(sku) {
    return bbdb.filter(field => field.SKU === sku);
  }
  
  getProductInfo = async (searchString) => {
    const encodedSearchString = encodeURIComponent(searchString.trim());
    const url = `https://bizhacks.bbycastatic.ca/mobile-si/si/v3/products/search?query=${encodedSearchString}`;
    const response = await fetch(url);
    const res = await response.json();
    const documents = res.searchApi.documents;
    return this.filterOutOfStock(documents);
  }

  filterOutOfStock(documents) {
    const filterDocs = documents.filter((document) => {
      const availability = document.summary.availability;
      let shipAvailability = availability.ship && availability.ship.available;
      let pickupAvailability = availability.pickup && availability.pickup.available;
      return pickupAvailability || shipAvailability;
    });
    return filterDocs;
  }

  onSubmit = async (formData) => {
    const results = await this.getProductInfo(formData.productName);
    this.setState({
      showForm: false,
      products: results,
     });
  }

  render() {
    return (
      <div className="App d-flex flex-column">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Motorino</h1>
        </header>
        <div className="alert alert-primary" role="alert">
          Input an image
        </div>
        
        {this.state.showForm && <ProductForm onSubmit={(data) => this.onSubmit(data)} />}
        {!this.state.showForm && <ProductList products={this.state.products} />}
      </div>
    );
  }
}

export default App;
