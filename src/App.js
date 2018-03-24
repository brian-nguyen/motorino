import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { getProductInfo } from './product-resolver';

import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
    };
  }

  getProductInfo = async (searchString) => {
    const encodedSearchString = encodeURIComponent(searchString.trim())
    
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
    console.log(results);
    this.setState({ showForm: false });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Motorino</h1>
        </header>
        <div className="alert alert-primary" role="alert">
          Input an image
        </div>

        <div className="m-3 card">
          <div className="card-body">
            <p className="card-text">Some box for image taking</p>
          </div>
        </div>
        
        {this.state.showForm && <ProductForm onSubmit={(data) => this.onSubmit(data)} />}
        {!this.state.showForm && <ProductList />}
      </div>
    );
  }
}

export default App;
