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
import Image from "./Image";
import NewImage from "./newImage";
import Main from "./Main";

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
          <Route path="/" element={<Main/>}/>
          <Route path="/Image" element={<Image/>} />
          <Route path="/newImage" element={<NewImage/>} />
        </Routes>
      </BrowserRouter>
      </div>
    </Layout>
  );
}

export default App;
