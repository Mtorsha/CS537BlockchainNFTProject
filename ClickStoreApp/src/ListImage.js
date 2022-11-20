import ImageForList from "./ImageForList";
import React, { Component } from "react";
import {ethers} from 'ethers'
import './ListImage.css';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Form, Button, Input, Message, Grid, Table } from "semantic-ui-react";

import web3 from "./web3";
import ClickStore from "./ClickStore";
// const { Header, Row, HeaderCell, Body } = Table;
class ListImage extends Component {
  state = {
    loading: false,
    errorMessage: "",
    artist_fee: "",
    price: "",
    url: "",
    artists: [],
    user: "",
    manager: "",
    artistBalance: "",
    pendingArtists: [],
    reports: [],
    artistData: [],
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
    const arr = this.state.artists.filter( artist => artist.registered==false);
    this.setState({ pendingArtists: arr});
    let report;
    if(this.state.user==manager){
        await ClickStore.methods.createReport().call();
        report = await ClickStore.methods.getReport().call();
        var toString = Object.prototype.toString;
        const reportsArray = Object.values(report);
        console.log(reportsArray);
        this.setState({ reports: reportsArray, artistData: reportsArray[6]});
    }
  }

  onApprove= async(event, i,artist_fees) => {
      // console.log('in',i,artist_fees,web3.utils.toWei(artist_fees, "ether"));
    this.setState({ loading: true});
    const accounts = await web3.eth.getAccounts();
    try {
    await ClickStore.methods.mintArt(i).send({
      from: accounts[0],
      value: artist_fees
    });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    this.setState({ loading: true});

    try {

      const accounts = await web3.eth.getAccounts();
      console.log('this.state.artist_fee',this.state.artist_fee,this.state.price);
      await ClickStore.methods.registerArt(web3.utils.toWei(this.state.artist_fee, "ether"), web3.utils.toWei(this.state.price, "ether"), this.state.url).send({
        from: accounts[0]
        // web3.utils.toWei(this.state.artist_fee.toString(), "ether"), // Sends exactly 0.02 ethe
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

  renderRowsReports() {
    let counter = 1
    return this.state.reports.map((report, index) => {
      if(counter!=6){
        return(
          <Table.Cell>{report}</Table.Cell>
        )
      counter++
    }
    });
  }

  renderRowsArtist() {
    console.log(this.state.artistData)
    return this.state.artistData.map((artist) => {
        return(
        //  <Table.Row key={index}>
            <Table.Cell>{artist}</Table.Cell>
        //  </Table.Row>
        //  <Table.Cell>artist</Table.Cell>
        )
    });
  }

  showReport(){
    //call getReport and show in the form of a table or cards
    if(this.state.reports.length==0){
        return (
        <h4> There are no reports.</h4>
      )
    }
    else
      {
        return(
        <>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Artist Total</Table.HeaderCell>
              <Table.HeaderCell>Image Total</Table.HeaderCell>
              <Table.HeaderCell>Total Never Sold</Table.HeaderCell>
              <Table.HeaderCell>Total Sold</Table.HeaderCell>
              <Table.HeaderCell>Total Relisted</Table.HeaderCell>
              <Table.HeaderCell>Manager Income</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
            {this.renderRowsReports()}
            </Table.Row>
          </Table.Body>
        </Table>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Artist Address</Table.HeaderCell>
              <Table.HeaderCell>Artist Balance</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
            {this.renderRowsArtist()}
            </Table.Row>
          </Table.Body>
        </Table>
      </>
      );
    }
  };

  renderRows() {
    return this.state.pendingArtists.map((artist, index) => {

      return (
        <Table.Row key={index}>
        <Table.Cell>{index+1}</Table.Cell>
        <Table.Cell>{artist.artistId}</Table.Cell>
        <Table.Cell>{artist.artistAddress}</Table.Cell>
        <Table.Cell>{artist.artist_fees}</Table.Cell>
        <Table.Cell>
        <Button color="green" basic loading={this.state.loading} onClick={event => this.onApprove(event,artist.artistId,artist.artist_fees)}>
                  Approve
        </Button>
        </Table.Cell>
        </Table.Row>
      );
    });
  }

  showPendingRequests(){

    if(this.state.pendingArtists.length==0)
    {
      return (
      <h4> There are no pending registration requests.</h4>
    )
  }
    else
    {
      return(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Request Number</Table.HeaderCell>
            <Table.HeaderCell>Artist ID</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Artist Fee</Table.HeaderCell>
            <Table.HeaderCell>Mint</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.renderRows()}
        </Table.Body>
      </Table>
    );
  }
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
