import React, { Component } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Spinner, Navbar, Nav, Card, Button, Container, Row, Col } from 'react-bootstrap'
import { Grid, Form, Message, Input } from "semantic-ui-react";
import web3 from "./web3";
import ClickStore from "./ClickStore";

class ImageForResell extends Component {
  state = {
    loading: false,
    errorMessage: "",
    price_set: "",
  };

  resellImage = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const accounts = await web3.eth.getAccounts();
    try {
      await ClickStore.methods.resellImage(this.props.id, this.state.price_set).send({
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
    const { id, price, uri, seller, boughtStatus, resellStatus} = this.props;
    return (
      <div>
      {!boughtStatus?
        <Col>
          <Card style={{ width: '12rem' }}>
            <Card.Img variant="top" style={{width: '12rem', height: '12rem'}} src={uri} />
            <Card.Body>
              <Card.Title>Token Id : {id}</Card.Title>
              <Card.Text>Price : {price}</Card.Text>
              <Card.Text>Seller : {seller}</Card.Text>
              <div>
                {!boughtStatus ? <div>Bought</div>:  <div>Not Bought</div>}
            </div>
            <div>
                {!resellStatus ? <div>Resell</div>:  <div>Not Resell</div>}
            </div>
            <Form onSubmit={this.resellImage} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Price to set</label>
                <Input
                  value={this.state.price_set}
                  onChange={(event) => this.setState({ price_set: event.target.value })}
                />
              </Form.Field>
              <Button loading onClick={this.resellImage}>Resell</Button>
            </Form>
            </Card.Body>
          </Card>
        </Col>
        :
        <div></div>}
      </div>
    );
  }
};

export default ImageForResell;
