import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';

import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
<<<<<<< HEAD
import Camera from './components/Camera';
import Ocr from './components/Ocr';

const bbdb = require('./bbdb.json');
=======
import ProductValidator from './components/ProductValidator';
>>>>>>> d2abe24bf87067c699323cd14921c8fc3aaf1a1c

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      products: [],
    };
  }

  getProductInfo = async (searchString) => {
    const encodedSearchString = encodeURIComponent(searchString.trim());
    const url = `https://bizhacks.bbycastatic.ca/mobile-si/si/v3/products/search?query=${encodedSearchString}`;
    const response = await fetch(url);
    const res = await response.json();
    const documents = res.searchApi.documents;

    return this.filter(documents);
  }

  filter(documents) {
    const filterDocs = documents.filter((document) => {
      const availability = document.summary.availability;
      const nameString = document.summary.names.short.trim().toLowerCase();
      const reg = nameString.match(/refurbished/g);
      let shipAvailability = availability.ship && availability.ship.available;
      let pickupAvailability = availability.pickup && availability.pickup.available;
      return (pickupAvailability || shipAvailability) && reg === null;
    });
    return filterDocs;
  }

  onSubmit = async (formData) => {
    const results = await this.getProductInfo(formData.productName, formData.price);
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
        <div className="m-3 card">
          <div className="card-body">
            <p className="card-text">Some box for image taking</p>
            <Ocr/>
          </div>
        </div>
        {this.state.showForm && <ProductForm onSubmit={(data) => this.onSubmit(data)} />}
        {!this.state.showForm && <ProductList products={this.state.products} />}

      </div>
    );
  }
}

export default App;
