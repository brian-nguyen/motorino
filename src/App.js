import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var bbdb = require('./bbdb.json');
var SKU = 10248353

class App extends Component {
  constructor() {
    super()
  }

//search BBDB finds and returns a list of objects with a SKU
//field SKU is a number
//other fields are strings
searchBBDB(bbdb, sku){
  var list = bbdb.filter(field => field.SKU === sku)
  return list;
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
