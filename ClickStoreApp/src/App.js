// import {
//   Link,
//   BrowserRouter,
//   Routes,
//   Route
// } from "react-router-dom";
import React from "react";
//import web3 from "./web3";
//import ClickStore from "./ClickStore";
import Layout from "./Layout";
import { useState } from 'react';
import BuyImage from "./BuyImage";
import NewImage from "./NewImage";
import ListImage from "./ListImage";
import ResellImage from "./ResellImage";

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Spinner, Navbar, Nav, Button, Container, Card, Row, Col } from 'react-bootstrap'
// import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({})

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

export default App;
