import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var bbdb = require('./bbdb.json');
var SKU = 10248353;
//search BBDB finds and returns a list of objects with a SKU
function searchBBDB(bbdb, sku){
  var list = [];
  for(var key in bbdb){
    if(bbdb[key].SKU === sku){
      console.log(bbdb[key]);
      list.push(bbdb[key]);
    }
  }
  return list;
}

searchBBDB(bbdb,SKU);

class App extends Component {
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
