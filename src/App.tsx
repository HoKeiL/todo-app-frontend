import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { todoList } from "./coponents/todoAppTitle";
// import { todoCardProp, DisplayTodoTask } from "./coponents/todoTaskCard";
import "./App.css";


function App(): JSX.Element {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [message, setMessage] = useState<string>();
  const [Task, setTask] = useState<string>('');
  const [DueDate, setDueDate] = useState<string>("");


  const loadDataFromEndpoint = async (endpoint: `/${string}`) => {
    try {
      const res = await fetch(`http://localhost:4000${endpoint}`);
      const body = await res.json();
      setMessage(body.message);

    } catch (err) {
      console.log(err);
      setMessage(`${(err as Error).name}: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    // safe to ignore exhaustive deps warning as we're _not_ triggering infinite updates, since our setState is conditional and not executed on all rerenders after the first one
    if (isFirstLoad) {
      // populate data on first load
      loadDataFromEndpoint("/todoapp");
      setIsFirstLoad(false);
    }
  });

  //use effect triggered when add todo task button is clicked, adding new task to the main todo list


  function todoInput(): JSX.Element {


    function handleClick() {
      console.log("add " + Task + " and " + DueDate + " to to-dos list!")
    }

    const today = moment(new Date()).format("YYYY-MM-DD");

    return (
      <div className="innerInputBarSection">
        <input className="inputBar" placeholder="Add new task..." value={Task} onChange={(event) => { setTask(event.target.value) }} />
        <input className="dueDate" type="date" value={DueDate} min={today} onChange={(event) => { setDueDate(event.target.value) }} />

        <button className="button" onClick={handleClick}>+</button>
      </div>
    );
  }





  return (
    <>
      <div>
        <h1 className="title">{todoList("My ToDo App")}</h1>
        {isFirstLoad && <p>Loading...</p>}
        {message && <p>{message}</p>}

      </div>

      <div className="inputBarSection">

        {todoInput()}
      </div>

      <div className="container">

        <div className="toDoMainList">
          <p>to Do Main List goes here</p>
          displaying all todo tasks
          {/* {newInProgressToDoArray.map((task) => (
            <DisplayTodoTask todo={task} key={task.id} />
          ))} */}

        </div>
        <div className="done">
          <p>todos marked done goes here</p>
        </div>

      </div>
    </>
  );
}

export default App;
