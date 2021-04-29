import React,{Fragment} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";

function Actions() {
    return (
      <Fragment>
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/">Tasks </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/new" eventKey="link-2">
              Create New Task
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Fragment>
    );
}

export default Actions
