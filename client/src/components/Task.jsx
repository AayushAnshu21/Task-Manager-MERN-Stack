import React, { Fragment, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { TaskContext } from "../App";
import "../App.css";

function Task(props) {
  const history = useHistory();

  const { state, dispatch } = useContext(TaskContext);
 

  const [formData, setFormData] = useState({
    name: "",
    priority: "",
  });
  const [startDate, setStartDate] = useState(new Date());

  const { name, priority } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      name,
      priority,
      due_date: startDate.toDateString(),
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newTask);
      const res = await axios.post("/task", body, config);
      const tasks = await axios.get("/tasks");
      dispatch({ type: "Tasks", payload: tasks.data });
      history.push("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <Col className="col-margin" md={{ span: 4, offset: 4 }}>
            <Card body>
              <Card.Title className="text-center text-info">
                <h3>New Task</h3>
              </Card.Title>
              <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group controlId="formBasicName">
                  <Form.Label className="font-weight-bold">Task</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter New Task"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="font-weight-bold">Priority</Form.Label>
                  <Form.Control
                    as="select"
                    name="priority"
                    value={priority}
                    onChange={(e) => onChange(e)}
                    required
                  >
                    <option
                      value=""
                      disabled
                      hidden
                      defaultValue
                      style={{ display: "none" }}
                    >
                      --- Choices ---
                    </option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formGriddate">
                  <Form.Label className="font-weight-bold">Due Date</Form.Label>
                  <br />
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
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
  );
}

export default Task;
