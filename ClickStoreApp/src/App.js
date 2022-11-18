
import React, { Component } from 'react';
import Layout from "./Layout";
import { useState } from 'react';
import {ethers} from 'ethers'
import BuyImage from "./BuyImage";
import NewImage from "./NewImage";
import ListImage from "./ListImage";
import ResellImage from "./ResellImage";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Spinner, Navbar, Nav, Button, Container, Card, Row, Col } from 'react-bootstrap'
// import Card from 'react-bootstrap/Card';
//import web3 from "./web3";
//import ClickStore from "./ClickStore";
//import Image_NFT_MarketPlace from "../artifacts/contracts/Clickstore.sol/Image_NFT_MarketPlace.json";
//import ClickStore from './artifacts/contracts/Clickstore.sol/Image_NFT_MarketPlace.json'
//const address = '0x7D0cd634506FB72964e353C59378fd2F4f1654d3';
import web3 from "./web3";
import ClickStore from "./ClickStore";

// import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

class App extends Component {
  constructor() {
       super();
        this.state = {
        manager: "",
        value: "",
        keyword: "",
        message: "",
      };
  }

  async componentDidMount() {
    console.log("hello");
    const manager = await ClickStore.methods.manager().call();

  //  await window.ethereum.request({ method: 'eth_requestAccounts' })
  //  const provider = new ethers.providers.Web3Provider(window.ethereum)
  //  const signer = provider.getSigner()
  //  const store = new ethers.Contract(address, ClickStore.abi, signer)
  //  const manager = await store.manager()
    console.log(manager)
  }

  render() {
    return (
      <Layout>
        <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListImage/>}/>
            <Route path="/BuyImage" element={<BuyImage/>} />
            <Route path="/ResellImage" element={<ResellImage/>} />
            <Route path="/newImage" element={<NewImage/>} />
          </Routes>
        </BrowserRouter>
        </div>
      </Layout>
    );
  }
}

export default App;
