import React, { Component } from 'react';
import { COMPANY_NAMES } from '../data';

const VALID_URL = 'https://www.amazon.ca/Apple-MacBook-Newest-Version-MQD32LL/dp/B06Y3NBZSJ/ref=sr_1_2?s=pc&rps=1&ie=UTF8&qid=1521906934&sr=1-2&keywords=macbook';

class Url extends Component {
  buttonClicked = () => {
    var urlText = document.getElementById('url').value;
    if (urlText == VALID_URL) {
      // Update form state
      console.log(this.props.formState);
      this.props.onSubmit({
        productName: "New Apple 13\" MacBook Air (2017 Newest Version) ",
        price: "CDN$ 1,279.00",
        competitor: "Amazon"
      });
    }
  }

  render() {
      return (
        <div className="Url d-flex flex-column align-items-center">
          <form>
            URL: <input type="text" id="url"></input>
            <input type="button" value="Submit" onClick={this.buttonClicked}/>
          </form>
        </div>
      );
  }
}

export default Url;
