import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./utils/baseUrl";
// import { DisplayTodoTask } from "./coponents/todoTaskCard";
import { todoViewProp, todoCardProp } from "./coponents/interfaces";
import { TodoInput } from "./coponents/TodoInput";
import { TodoHeader } from "./coponents/TodoHeader";
import { TodoFooter } from "./coponents/TodoFooter";
import moment from "moment";
import "./App.css";

function App(): JSX.Element {
  const [Message, setMessage] = useState<string>();
  const [NewTask, setNewTask] = useState<string>("");
  const [DueDate, setDueDate] = useState<string>("");
  const [TodosInProgress, setTodosInProgress] = useState<todoCardProp[]>([]);
  const [ToDoIsDone, setToDoIsDone] = useState<todoCardProp[]>([]);

  const fetchAllTodos = async (endpoint: string) => {
    try {
      const response = await axios.get(`${baseUrl}${endpoint}`);
      const todos = response.data;
      const inProgressTodos = todos.filter(
        (todo: todoCardProp) => todo.completed === false
      );
      setTodosInProgress(inProgressTodos);
      const doneTodos = todos.filter(
        (todo: todoCardProp) => todo.completed === true
      );
      setToDoIsDone(doneTodos);
      setMessage(todos.message);
      console.log("fetched all todos");
    } catch (err) {
      console.log(err);
      setMessage(`${(err as Error).name}: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    // populate data on first load
    fetchAllTodos("/todoapp");
  }, []);

  const handleAddNewTask = async () => {
    if (NewTask.length === 0 || DueDate.length === 0) {
      alert("Please enter both task and duedate :)");
    } else {
      const response = await axios.post(`${baseUrl}/todoapp`, {
        task: NewTask,
        duedate: DueDate,
        completed: false,
      });
      fetchAllTodos("/todoapp");
      setNewTask("");
      setDueDate("");
      console.log("New todo has been added " + response.data.task);
    }
  };

  function DisplayTodoTask(props: todoViewProp): JSX.Element {
    const [isDone, setIsDone] = useState<boolean>(
      props.todo.completed === true ? true : false
    );

    const handleDoneCheckbox = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setIsDone(e.target.checked);

      const todoId = props.todo.id;
      if (isDone === false) {
        props.todo["completed"] = true;
      } else {
        props.todo["completed"] = false;
      }

      const response = await axios.patch(`${baseUrl}/todoapp/${todoId}`, {
        completed: props.todo.completed,
      });
      console.log(
        response.data +
          "ID:" +
          todoId +
          " has been updated to " +
          props.todo.completed
      );
      fetchAllTodos("/todoapp");
    };

    const handleDelete = async () => {
      const todoId = props.todo.id;
      const response = await axios.delete(`${baseUrl}/todoapp/${todoId}`);
      console.log(response.data + "ID:" + todoId + " has been deleted");
      fetchAllTodos("/todoapp");
    };

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
        <h4 className="taskdueDate">
          Due date: {moment(props.todo.duedate).format("DD-MM-YYYY")}
        </h4>
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
        <TodoHeader />
        {Message && <p>{Message}</p>}
      </div>
      <div className="inputBarSection">
        <TodoInput
          NewTask={NewTask}
          setNewTask={setNewTask}
          DueDate={DueDate}
          setDueDate={setDueDate}
        />
        <button className="button" onClick={handleAddNewTask}>
          +
        </button>
      </div>
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
      <TodoFooter />
    </>
  );
}

export default App;
