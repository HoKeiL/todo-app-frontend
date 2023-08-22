import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import dotenv from "dotenv";
// import { DisplayTodoTask } from "./coponents/todoTaskCard";
import { todoCardProp, ToDoViewProp } from "./coponents/interfaces";
import "./App.css";


dotenv.config();

function App(): JSX.Element {
  const [message, setMessage] = useState<string>();
  const [NewTask, setNewTask] = useState<string>("");
  const [DueDate, setDueDate] = useState<string>("");
  const [TodosInProgress, setTodosInProgress] = useState<todoCardProp[]>([]);
  const [ToDoIsDone, setToDoIsDone] = useState<todoCardProp[]>([]);

  async function fetchAllTodos(endpoint: string) {
    try {
      const response = await axios.get(process.env.NODE_ENV + endpoint);
      const todos = await response.data;
      const inProgressTodos = todos.filter(
        (todo: todoCardProp) => todo.status === "InProgress"
      );
      setTodosInProgress(inProgressTodos);
      const doneTodos = todos.filter(
        (todo: todoCardProp) => todo.status === "Done"
      );
      setToDoIsDone(doneTodos);
      setMessage(todos.message);
      console.log("fetched data");
    } catch (err) {
      console.log(err);
      setMessage(`${(err as Error).name}: ${(err as Error).message}`);
    }
  }

  useEffect(() => {
    // populate data on first load
    fetchAllTodos("/todoapp");
  }, []);

  function todoInput(): JSX.Element {
    async function handleAddNewTask() {
      if (NewTask.length === 0 || DueDate.length === 0) {
        alert("please enter both task and duedate!");
      } else {
        const response = await axios.post("http://localhost:4000/todoapp", {
          task: NewTask,
          dueDate: DueDate,
          status: "InProgress",
        });
        console.log(response.data);
      }

      fetchAllTodos("/todoapp");
      setNewTask("");
      setDueDate("");
    }

    const today = moment(new Date()).format("YYYY-MM-DD");

    return (
      <div className="innerInputBarSection">
        <input
          className="inputBar"
          placeholder="Add new task..."
          value={NewTask}
          onChange={(event) => {
            setNewTask(event.target.value);
          }}
        />
        <input
          className="dueDateInput"
          type="date"
          value={DueDate}
          min={today}
          onChange={(event) => {
            setDueDate(event.target.value);
          }}
        />
        <button className="button" onClick={handleAddNewTask}>
          +
        </button>
      </div>
    );
  }

  function DisplayTodoTask(props: ToDoViewProp): JSX.Element {
    const [isDone, setIsDone] = useState<boolean>();

    async function handleDoneCheckbox() {
      const todoId = props.todo.id;
      if (props.todo.status === "InProgress") {
        props.todo["status"] = "Done";
        setIsDone(true);
      } else {
        props.todo["status"] = "InProgress";
        setIsDone(false);
      }

      const response = await axios.patch(
        `http://localhost:4000/todoapp/${todoId}`,
        { status: props.todo.status }
      );
      console.log(
        response.data +
        "ID:" +
        todoId +
        " has been updated to " +
        props.todo.status
      );

      fetchAllTodos("/todoapp");
    }

    async function handleDelete() {
      const todoId = props.todo.id;
      const response = await axios.delete(
        `http://localhost:4000/todoapp/${todoId}`
      );
      console.log(response.data + "ID:" + todoId + " has been deleted");
      fetchAllTodos("/todoapp");
    }

    return (
      <div className="todoTask">
        <h2 className="taskDescription">Task: {props.todo.task}</h2>
        <div className="isDoneGroup">
          <label className="isDone">Done</label>
          <input
            type="checkbox"
            className="isDoneButton"
            checked={isDone}
            onChange={handleDoneCheckbox}
          />
        </div>
        <hr className="divider"></hr>
        <h4 className="taskdueDate">Due date: {props.todo.dueDate}</h4>
        <button type="button" className="bin" onClick={handleDelete}>
          {" "}
          Bin{" "}
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="title">My ToDo App</h1>
        {message && <p>{message}</p>}
      </div>
      <div className="inputBarSection">{todoInput()}</div>
      <div className="container">
        <div className="inProgressList">
          <h2 className="inProgressTitle">-- In Progress tasks --</h2>
          {TodosInProgress.map((e) => (
            <DisplayTodoTask todo={e} key={e.id} />
          ))}
        </div>
        <div className="doneList">
          <h2 className="doneTitle">-- Done tasks --</h2>
          {ToDoIsDone.map((e) => (
            <DisplayTodoTask todo={e} key={e.id} />
          ))}
        </div>
      </div>
      <footer className="footer">
        <p>
          My frontend repo{" "}
          <a
            className="repoLinks"
            href="https://github.com/HoKeiL/todo-app-frontend"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>{" "}
          and my backend repo{" "}
          <a
            className="repoLinks"
            href="https://github.com/HoKeiL/todo-app-backend"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>{" "}
        </p>
      </footer>
    </>
  );
}

export default App;
