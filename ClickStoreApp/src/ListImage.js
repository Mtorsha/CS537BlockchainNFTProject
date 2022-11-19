import ImageForList from "./ImageForList";
import React, { Component } from "react";
import {ethers} from 'ethers'
import './ListImage.css';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Form, Button, Input, Message, Grid, Table, Header } from "semantic-ui-react";

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
    user: "",
    manager: "",
    artistBalance: ""
  };

  async componentDidMount() {

    const manager = await ClickStore.methods.manager().call();
    this.setState({manager});
   const accounts = await web3.eth.getAccounts();
    this.setState({user: accounts[0]});
    const artistBalance = await ClickStore.methods.balanceOf(accounts[0]).call();
    this.setState({artistBalance});
    const artists = await ClickStore.methods.getArtist().call();
    if(artists.length!=0){
      this.setState({ artists: artists});
    }
    console.log(artists);
  }

  // onClick = async (event) => {
  //   event.preventDefault();
  //   this.setState({ loading: true});
  //
  //   try {
  //     const artists = await ClickStore.methods.artist("0").call();
  //     console.log(artists);
  // //    const accounts = await web3.eth.getAccounts();
  //   //  console.log(accounts);
  //   } catch (err) {
  //     this.setState({ errorMessage: err.message });
  //   }
  //   this.setState({ loading: false });
  // };

  onSubmitForm = async (event) => {
    event.preventDefault();
    this.setState({ loading: true});

    try {

      const accounts = await web3.eth.getAccounts();
      console.log('this.state.artist_fee',typeof(this.state.artist_fee));
      await ClickStore.methods.registerArt(this.state.artist_fee, this.state.price, this.state.url).send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.artist_fee.toString(), "ether"), // Sends exactly 0.02 ethe
      });

    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  showForm() {
      return (
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <Form onSubmit={this.onSubmitForm} error={!!this.state.errorMessage}>
                <Grid.Row>
                <Form.Field>
                  <label>Artist Fee(Ether)</label>
                  <Input
                    value={this.state.artist_fee}
                    onChange={(event) => this.setState({ artist_fee: event.target.value })}
                  />
                </Form.Field>
                </Grid.Row>
                <Grid.Row>
                <Form.Field>
                  <label>Price(Ether)</label>
                  <Input
                    value={this.state.price}
                    onChange={(event) => this.setState({ price: event.target.value })}
                  />
                </Form.Field>
                </Grid.Row>
                <Grid.Row>
                <Form.Field>
                  <label>URL</label>
                  <Input
                    value={this.state.url}
                    onChange={(event) => this.setState({ url: event.target.value })}
                  />
                </Form.Field>
                </Grid.Row>

                <br></br>
                <Button loading={this.state.loading} primary>
                  Register New Art!
                </Button>
                <Message error header="Oops!" content={this.state.errorMessage} />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        );

  }

  // showArtist() {
  //   return this.state.artists.map((artist) => {
  //     return (
  //         <div>{artist}</div>
  //     );
  //   });
  // }

  showReport(){
    //call getReport and show in the form of a table or cards
    return(<div>show the components from report</div>)
  };

  showPendingRequests(){
    //show the artists who are not yet registered in the table below. Add a button in
    //to call mintArt in the last column just like approve request in hw11
    const arr = this.state.artists.filter( artist => artist.registered==false)
    return(
      <div>show artists</div>
    /*    <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Address</HeaderCell>
            <HeaderCell>Artist Fee</HeaderCell>
            <HeaderCell>Mint</HeaderCell>
          </Row>
        </Header>
        <Body>{
          arr.map((artist, index) => {
  /*          <Cell>1</Cell>
            <Cell>{artist.artistAddress}</Cell>
            <Cell>{request.artist_fees}</Cell>
            <Cell>
                <Button color="green" basic>
                  Approve
                </Button>
            </Cell>
            <Row>
            <Cell>1</Cell>
            <Cell>2</Cell>
            <Cell>3</Cell>
            <Cell>4</Cell>
            </Row>
          })
        }</Body>
      </Table>
      */
    );
  };

  render() {
    if(this.state.user!=this.state.manager)
    {
      return (
        <Grid>
        <Grid.Row>
        <h2>Welcome, {this.state.user}! You have {this.state.artistBalance} unsold item(s) listed.</h2>
        </Grid.Row>
        <Grid.Row>
        {this.showForm()}
        </Grid.Row>
        </Grid>
      );
    }
    else
    return (
      <Grid>
      <Grid.Row>
        <h2> Welcome! You are the manager of this marketplace.</h2>
      </Grid.Row>
      <Grid.Row>
          <Grid.Column width={6}>
            {this.showForm()}
          </Grid.Column>
          <Grid.Column width={10}>
          <Grid.Row>
            {this.showPendingRequests()}
          </Grid.Row>
          <Grid.Row>
            {this.showReport()}
          </Grid.Row>
          </Grid.Column>
      </Grid.Row>
      </Grid>
    );
  }
};

export default ListImage;
