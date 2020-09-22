import React, { Fragment } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import '../App.css'

function HNavbar() {
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="mx-auto">
          <h3>Task Manager</h3>
        </Navbar.Brand>
      </Navbar>
    </Fragment>
  );
}

export default HNavbar
