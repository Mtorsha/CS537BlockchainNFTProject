// import {
//   Link,
//   BrowserRouter,
//   Routes,
//   Route
// } from "react-router-dom";
import React from "react";
import web3 from "./web3";
import ClickStore from "./ClickStore";
import { useState } from 'react';
import BuyImage from "./BuyImage";
import { Spinner, Navbar, Nav, Button, Container, Card, Row, Col } from 'react-bootstrap'
// import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({})

  return (
    <div>
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Click Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Resales</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
      <Row>
        <Col><BuyImage id= "Beach" image="https://bafybeibvwrrt6obpfxb4xxe7lm5bmbeaiowghxq6r5kszcgf5jtdjz5tyu.ipfs.nftstorage.link/"/></Col>
        <Col><BuyImage id= "Joshua Tree" image="https://bafybeifiujz7it44xbohaedjfq2fvvdh5gvfir72tn7t7uhbbbftssxfkm.ipfs.nftstorage.link/"/></Col>
        <Col><BuyImage id= "Desert" image="https://bafybeicz7nmhvaafus3kauixylekret7ru7u3ixr233jcj7asyge5o7i3y.ipfs.nftstorage.link/"/></Col>
      </Row>
      <br></br>
      <Row>
        <Col><BuyImage id= "Sunset" image="https://bafybeihhw3ppgffo3dbnr52ec72uh4t42psnafwfjeflfwislqqfnerwaq.ipfs.nftstorage.link/"/></Col>
        <Col><BuyImage id= "Sky" image="https://bafybeigb6bjzdmqwnu6jwy7kl5b5jvwqzcpebb7mjitlxskckhuro4vnii.ipfs.nftstorage.link/"/></Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
