import { todoList } from "./utils/todoAppTitle";

function App(): JSX.Element {
  return (
    <>
      <h1 className="title">{todoList("My ToDo App")}</h1>
    </>
  );
}

export default App;
