import Layout from "./Layout";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Spinner, Navbar, Nav, Card, Button, Container, Row, Col } from 'react-bootstrap'

const Main = (props) => {

  const Main = () => {
    console.log('main');
  };

  return (
        <div>
          <h3>Open Image</h3>
          <Link to="/NewImage">
            <a>
              <Button
                floated="right"
                content="Create New Image"
                icon="add circle"
                primary
              >
              New Image</Button>
            </a>
          </Link>
        </div>
  );

};

export default Main;
