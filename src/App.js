import React, { Component } from 'react';
import logo from './logo.svg';
import Ocr from './Ocr'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  render() {
    return (
      <div className="App">
        <Ocr/>
      </div>
    );
  }
}

export default App;
