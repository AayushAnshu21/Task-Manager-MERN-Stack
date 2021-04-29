import React, {
  Fragment,
  useContext,
  useReducer,
  createContext,
  useEffect,
} from "react";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Actions from "./components/Actions";
import Task from "./components/Task";
import ListTask from "./components/ListTask";
import UpdateTask from "./components/UpdateTask";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { reducer, initialState } from "./reducer/reducer";

export const TaskContext = createContext();

const Routing = () => {
  const { states, dispatch } = useContext(TaskContext);
  useEffect(() => {
    async function fetchtask() {
      const tasks = await axios.get("/tasks");
      if (tasks.data.length) {
        dispatch({ type: "Tasks", payload: tasks.data });
      }
    }
    fetchtask();
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={ListTask} />
      <Route exact path="/new" component={Task} />
      <Route exact path="/task/:id" component={UpdateTask} />
      <Route component={() => <h1>Does not exist</h1>} />
    </Switch>
  );
};

function App() {
  const [states, dispatch] = useReducer(reducer, initialState);
  return (
    <Fragment>
      <TaskContext.Provider value={{ states, dispatch }}>
        <Navbar />
        <Actions />
        <Router>
          <Routing />
        </Router>
      </TaskContext.Provider>
    </Fragment>
  );
}

export default App;
