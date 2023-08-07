import { useEffect, useState } from "react";
import { todoList } from "./coponents/todoAppTitle";
import { todoInput } from "./coponents/todoInput";
import "./App.css";

function App(): JSX.Element {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [message, setMessage] = useState<string>();
  const loadDataFromEndpoint = async (endpoint: `/${string}`) => {
    // try... catch documentation:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    try {
      const res = await fetch(`https://hokeil-todo-app.onrender.com${endpoint}`);
      const body = await res.json();
      setMessage(body.message);
    } catch (err) {
      console.log(err);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // safe to ignore exhaustive deps warning as we're _not_ triggering infinite updates, since our setState is conditional and not executed on all rerenders after the first one
    if (isFirstLoad) {
      // populate data on first load
      loadDataFromEndpoint("/todoapp");
      setIsFirstLoad(false);
    }
  });

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
