import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';

import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ProductValidator from './components/ProductValidator';
import Camera from './components/Camera';
import Ocr from './components/Ocr';
import { sortByCompany } from './data';

var SKU = 10243865;
var comp = "Best Buy Canada";

class App extends Component {
  constructor(props) {
    super(props);
    const results = sortByCompany(SKU);
    console.log(results);
    const match = results.find(e => e["Retailer"] == "Amazon");
    console.log(match["Price"]);
    const price = parseFloat(match["Price"].replace("$", ""));
    console.log(price);
    if (100.99 <= price) {
      console.log('price match');
    }


    this.state = {
      showForm: true,
      products: [],
    };
  }

  checkForCompetitor( company, competitors){
      var found = competitors.find( (e) => {return e["Retailer"] == company});
      if( found == undefined ){
        return false;
      }
      return found["Price"];
  }

  removeDollar(field){
    var temp =  parseFloat(field.replace("$",""));
    console.log(temp);
    return temp;

  }

  checkPrice( priceFlyer, priceComp){
    console.log(priceFlyer);
    if(parseFloat(priceFlyer) <= this.removeDollar(priceComp)){ //price matched
      return this.priceReduction(priceComp, priceFlyer);
    }
    return false; //price not matched
  }

  priceReduction( orig, match){
    return match - (orig-match)*0.1;
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
