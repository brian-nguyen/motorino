import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';

import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ProductValidator from './components/ProductValidator';
import { sortByCompany } from './data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      showValidation: false,
      error: '',
      products: [],
    };
  }

  getProductInfo = async (searchString) => {
    const encodedSearchString = encodeURIComponent(searchString.trim());
    const url = `https://bizhacks.bbycastatic.ca/mobile-si/si/v3/products/search?query=${encodedSearchString}`;
    const response = await fetch(url);
    const res = await response.json();
    const documents = res.searchApi.documents;

    const filteredDocs = this.filterSku(documents);
    return filteredDocs;
  }

  filterSku(documents) {
    const filterDocs = documents.filter((document) => {
      // const availability = document.summary.availability;
      const nameString = document.summary.names.short.trim().toLowerCase();
      const reg = nameString.match(/refurbished/g);
      // let shipAvailability = availability.ship && availability.ship.available;
      // let pickupAvailability = availability.pickup && availability.pickup.available;
      // (pickupAvailability || shipAvailability) &&
      return reg === null;
    });
    return filterDocs;
  }

  filterUnavailable(documents) {
    const filterDocs = documents.filter((document) => {
      const availability = document.summary.availability;
      let shipAvailability = availability.ship && availability.ship.available;
      let pickupAvailability = availability.pickup && availability.pickup.available;
      return (pickupAvailability || shipAvailability);
    });
    return filterDocs;
  }

  onSubmit = async (formData) => {
    let availableProds = []
    const prods = await this.getProductInfo(formData.productName, formData.price);
    if (prods.length === 0) {
      // best buy doesn't sell this item
      this.setState({
        showValidation: true,
        error: "BESTBUY doesn't have this item",
      });
    } else {
      availableProds = this.filterUnavailable(prods);
      if (availableProds.length === 0) {
        // product is not in stock
        this.setState({
          showValidation: true,
          error: "Item is not in stock at BESTBUY",
        });
      }
    }

    this.setState({
      showForm: false,
      formData: formData,
      products: availableProds,
    });
  }

  onFinish = (discountedPrice) => {
    if (discountedPrice === false) {
      this.setState({
        showValidation: true,
        error: 'No discount was applied'
      });
      return;
    }

    // TODO: Show success component here
    console.log(discountedPrice);
  }

  render() {
    return (
      <div className="App d-flex flex-column">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Best Buy's Automated Price-Beat System</h1>
        </header>
        {this.state.showForm && <ProductForm onSubmit={(data) => this.onSubmit(data)} />}
        {!this.state.showForm && <ProductList products={this.state.products} formData={this.state.formData} onFinish={(p) => this.onFinish(p)} />}
        {!this.state.showForm && this.state.showValidation && <ProductValidator success={false} failureType={this.state.error} />}
      </div>
    );
  }
}

export default App;
