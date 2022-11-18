import React, { Component } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Spinner, Navbar, Nav, Card, Button, Container, Row, Col } from 'react-bootstrap'
import { Grid, Form, Message, Input } from "semantic-ui-react";
import web3 from "./web3";
import ClickStore from "./ClickStore";

class ImageForBuy extends Component {
  buyImage = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const accounts = await web3.eth.getAccounts();
    try {
      await ClickStore.methods.buyImage(this.props.id).send({
        from: accounts[0],
        value: this.props.price,
        //web3.utils.toWei(this.state.price, "ether"),
        gas: "30000000",
      });
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
    }
    this.setState({ loading: false });
  }

  render() {
    const { id, price, uri, seller, boughtStatus} = this.props;
    return (
      <Col>
        <Card style={{ width: '12rem' }}>
          <Card.Img variant="top" style={{width: '12rem', height: '12rem'}} src={uri} />
          <Card.Body>
            <Card.Title>Token Id : {id}</Card.Title>
            <Card.Text>Price : {price}</Card.Text>
            <Card.Text>Seller : {seller}</Card.Text>
            <div>
              {boughtStatus ? <div>Bought</div>:  <div>Not Bought</div>}
          </div>
          <Button loading onClick={this.buyImage}>Buy</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
};

export default ImageForBuy;
