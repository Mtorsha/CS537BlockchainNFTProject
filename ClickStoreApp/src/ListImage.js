import ImageForList from "./ImageForList";
import React, { Component } from "react";
import {ethers} from 'ethers'
import './ListImage.css';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Spinner, Navbar, Nav, Card, Button, Container, Row, Col } from 'react-bootstrap'
import { Grid, Form, Message, Input } from "semantic-ui-react";
//import ClickStore from './artifacts/contracts/Clickstore.sol/Image_NFT_MarketPlace.json'
//const address = '0x7D0cd634506FB72964e353C59378fd2F4f1654d3';
import web3 from "./web3";
import ClickStore from "./ClickStore";

class ListImage extends Component {
  state = {
    loading: false,
    buttonClick: false,
    errorMessage: "",
    artist_fee: "",
    price: "",
    url: "",
    artists: [],
  };

  async componentDidMount() {
    const artists = await ClickStore.methods.getArtist().call();
    if(artists.length!=0){
      this.setState({ artists: artists});
    }
    console.log(artists);
//    const accounts = await web3.eth.getAccounts();
  }

  onClick = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, buttonClick: true});

    try {
      const artists = await ClickStore.methods.artist("0").call();
      console.log(artists);
  //    const accounts = await web3.eth.getAccounts();
    //  console.log(accounts);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    this.setState({ loading: true});

    try {
      const manager = await ClickStore.methods.manager().call();
      const accounts = await web3.eth.getAccounts();
      console.log("manager")
      console.log(manager)
      console.log(this.state.artist_fee)
      console.log(this.state.price)
      console.log(this.state.url)
      await ClickStore.methods.registerArt(accounts[0], this.state.artist_fee, this.state.price, this.state.url).send({
        from: manager,
        value: this.state.artist_fee,
        //web3.utils.toWei(this.state.artist_fee,, "ether"), // Sends exactly 0.02 ethe
      });
      const artists = await ClickStore.methods.getArtist().call();
      console.log(artists);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  showForm() {
    if (this.state.buttonClick==true) {
      return (
        <Grid>
          <Form onSubmit={this.onSubmitForm} error={!!this.state.errorMessage}>
            <Grid.Row>
              <Grid.Column width={5}>
                  <Form.Field>
                    <label>Artist Fee(Ether)</label>
                    <Input
                      value={this.state.artist_fee}
                      onChange={(event) => this.setState({ artist_fee: event.target.value })}
                    />
                  </Form.Field>
              </Grid.Column>
              <Grid.Column width={5}>
                  <Form.Field>
                    <label>Price(Ether)</label>
                    <Input
                      value={this.state.price}
                      onChange={(event) => this.setState({ price: event.target.value })}
                    />
                  </Form.Field>
              </Grid.Column>
              <Grid.Column width={5}>
                  <Form.Field>
                    <label>URL</label>
                    <Input
                      value={this.state.url}
                      onChange={(event) => this.setState({ url: event.target.value })}
                    />
                  </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Input type="submit" value="Submit" />
          </Form>
        </Grid>
        );
    }
  }

  showArtist() {
    return this.state.artists.map((artist) => {
      return (
          <div>{artist}</div>
      );
    });
  }

  render() {
    return (
      <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <Button onClick={this.onClick} loading={this.state.loading} primary>
               Create
            </Button>
            <div className="form1">
            {this.showForm()}
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <label>Artist List</label>
            {this.showArtist()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Container>
    );
  }
};

export default ListImage;
