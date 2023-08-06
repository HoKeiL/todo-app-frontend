import { todoList } from "./coponents/todoAppTitle";
import { todoInput } from "./coponents/todoInput";
import "./App.css";

function App(): JSX.Element {
  return (
    <>
      <h1 className="title">{todoList("My ToDo App")}</h1>
      <p>{todoInput()}</p>
    </>
  );
}

export default App;
