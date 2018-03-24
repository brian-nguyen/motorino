import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {getSKUS} from './product-resolver';

import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
    };
  }

  componentDidMount() {
    getSKUS();
  }

  onSubmit = (formData) => {
    console.log(formData);
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
