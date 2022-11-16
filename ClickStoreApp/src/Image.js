import BuyImage from "./BuyImage";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Spinner, Navbar, Nav, Card, Button, Container, Row, Col } from 'react-bootstrap'

const Image = (props) => {

  const buy = () => {
    console.log('buy');
  };

  return (
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
  );

};

export default Image;
