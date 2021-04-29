import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { TaskContext } from "../App";

function UpdateTask() {
  let { id } = useParams();
  const history = useHistory();

  const { states, dispatch } = useContext(TaskContext);
  let f = states && states.length && states.find((state) => state._id == id);

  const onSubmit = async (e) => {
    e.preventDefault();
    let task_status = e.target["task_status"].value;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({task_status:task_status});
      const res = await axios.patch(`/task/${id}`, body, config);
      const tasks = await axios.get("/tasks");
      dispatch({ type: "Tasks", payload: tasks.data });
      history.push("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return f ? (
    <Fragment>
      <Container>
        <Row>
          <Col className="col-margin" md={{ span: 4, offset: 4 }}>
            <Card body>
              <Card.Title className="text-center text-info">
                <h3>Update Task</h3>
              </Card.Title>
              <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="font-weight-bold">
                    Task Status
                  </Form.Label>
                  <Form.Control as="select" name="task_status" required>
                    <option
                      value=""
                      disabled
                      hidden
                      defaultValue
                      style={{ display: "none" }}
                    >
                      --- Choices ---
                    </option>
                    <option value="To Do">To Do</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                  </Form.Control>
                </Form.Group>

                <center>
                  <Button variant="primary" type="submit" className="btn-block">
                    Save
                  </Button>
                </center>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  ) : (
    <p>Sorry route does not exist</p>
  );
}

export default UpdateTask;
