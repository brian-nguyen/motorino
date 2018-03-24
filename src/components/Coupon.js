import React from 'react';

export default class Coupon extends React.Component {
  render() {

    return (
        <div className="jumbotron w-50" style={{ alignSelf:'center' }} alignitems="center" height="350">
            <h1 className="display-4" >Lowest Price Match Guarantee was met!</h1>
            <div class="alert alert-success" role="alert"> {this.props.message}</div>
            <p className="lead">The new price for your product is ${this.props.newPrice}. Present the following coupon code at checkout to save!</p>
            <h4>{Math.floor(Math.random() * 9999999999999999)}</h4>
            <hr className="my-4"/>
            <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">Click to Print</a>
            </p>
        </div>
    );
  }
}
