import { useEffect, useState } from "react";
import moment from "moment";
// import baseUrl from "./utils/environmentVariables";
import { todoList } from "./coponents/todoAppTitle";
import { todoInput } from "./coponents/todoInput";
import "./App.css";

function App(): JSX.Element {
 

  return (
    <>
      <div>
        <h1 className="title">{todoList("My ToDo App")}</h1>

      </div>

      <div className="inputBarSection">{todoInput()}</div>

      <div className="container">
        <div className="calendar">
          <p>calendar goes here</p>
        </div>

        <div className="doneThisMonth">
          <p>done This Month goes here</p>
        </div>
        <div className="toDoMainList">
          <p>to Do Main List goes here</p>
        </div>
        <div className="filterOptions">
          <p>filters goes here</p>
        </div>
      </div>
    </>
  );
}

export default App;
