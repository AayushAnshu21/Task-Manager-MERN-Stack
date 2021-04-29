import React, { Fragment, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { TaskContext } from "../App";

function ListTask() {
  const { states, dispatch } = useContext(TaskContext);
  function changeDate (date) {
    let newDate = new Date(date);
    return newDate.toDateString();    
  }

  return (
    <Fragment>
      <Container>
        <Row>
          {states ? (
            states.map((state) => (
              <Col key={state._id} md={{ span: 4 }}>
                <Card
                  bg="light"
                  key={state._id}
                  text="dark"
                  style={{ width: "18rem" }}
                  className="mb-2"
                >
                  <Card.Header>Priority : {state.priority}</Card.Header>
                  <Card.Body>
                    <Card.Title> {state.name} </Card.Title>
                    <Card.Text>
                      Date Created : {changeDate(state["createdAt"])}
                    </Card.Text>
                    <Card.Text>Due Date : {state["due_date"]}</Card.Text>
                    <Card.Text>Task Status : {state["task_status"]}</Card.Text>
                    <Button variant="info" href={"task/" + state._id}>
                      Edit
                    </Button>{" "}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No Tasks to Show</p>
          )}
        </Row>
      </Container>
    </Fragment>
  );
}

export default ListTask;
