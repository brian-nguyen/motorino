import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash'
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const bbdb = require('./bbdb.json');
var SKU = 10248353; // used for testing

class App extends Component {
  constructor(props) {
    super(props);
    this.sortByCompany(SKU);
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
  
  dateFromObject(obj){
    var date = "Crawl Date"
      var mydate = new Date(
        '20'+obj[date].substring(7,9),
        MONTH_NAMES.indexOf(obj[date].substring(3,6)),
        obj[date].substring(0,2),
      );
      
    return mydate;
  }

  sortByDate(sku){
    let searched = this.searchBBDB(sku);
    searched.sort( (a,b)=> {return this.dateFromObject(b) - this.dateFromObject(a)});
    return searched;
  }

  sortByCompany(sku){
    let sorted = this.sortByDate(sku);
    console.log(sorted);
    let mostrecent = _.uniqBy(sorted,(x)=>{return x["Retailer"]});
    console.log(mostrecent);
    return mostrecent;
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
      console.log(document.summary.names.short);
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
    console.log(results);
    this.setState({
      showForm: false,
      products: results,
     });
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
        {!this.state.showForm && <ProductList products={this.state.products} />}
      </div>
    );
  }
}

export default App;
