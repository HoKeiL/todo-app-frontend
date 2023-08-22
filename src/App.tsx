import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import dotenv from 'dotenv'
// import { DisplayTodoTask } from "./coponents/todoTaskCard";
import { todoCardProp, ToDoViewProp } from "./coponents/interfaces"
import "./App.css";


function App(): JSX.Element {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [message, setMessage] = useState<string>();
  const [NewTask, setNewTask] = useState<string>('');
  const [DueDate, setDueDate] = useState<string>('');
  const [TodosInProgress, setTodosInProgress] = useState<todoCardProp[]>([]);
  const [ToDoIsDone, setToDoIsDone] = useState<todoCardProp[]>([]);






  const loadDataFromEndpoint = async (endpoint: `/todoapp`) => {
    try {
      const res = await fetch(`http://localhost:4000${endpoint}`);
      const body = await res.json();
      setMessage(body.message);
      console.log("fetched data");

    } catch (err) {
      console.log(err);
      setMessage(`${(err as Error).name}: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    // safe to ignore exhaustive deps warning as we're _not_ triggering infinite updates, since our setState is conditional and not executed on all rerenders after the first one
    if (isFirstLoad) {
      fetchAllTodos()
      // populate data on first load
      loadDataFromEndpoint("/todoapp");
      setIsFirstLoad(false);

    }
  });

  async function fetchAllTodos() {
    const response = await axios.get("http://localhost:4000/todoapp");
    const todos = response.data;
    const inProgressTodos = todos.filter((todo: todoCardProp) => todo.status === "InProgress");
    setTodosInProgress(inProgressTodos);
    const doneTodos = todos.filter((todo: todoCardProp) => todo.status === "Done");
    setToDoIsDone(doneTodos);

  }

  function todoInput(): JSX.Element {

    async function handleAddNewTask() {

      axios.post('http://localhost:4000/todoapp', {
        task: NewTask,
        dueDate: DueDate,
        status: "InProgress"
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
      fetchAllTodos()
      setNewTask('')
      setDueDate('')
    }

    const today = moment(new Date()).format("YYYY-MM-DD");

    return (
      <div className="innerInputBarSection">
        <input className="inputBar" placeholder="Add new task..." value={NewTask} onChange={(event) => { setNewTask(event.target.value) }} />
        <input className="dueDateInput" type="date" value={DueDate} min={today} onChange={(event) => { setDueDate(event.target.value) }} />
        <button className="button" onClick={handleAddNewTask}>+</button>
      </div>
    );
  }


  function DisplayTodoTask(props: ToDoViewProp): JSX.Element {
    const [isDone, setIsDone] = useState<boolean>(false)

    async function handleDoneCheckbox() {
      const isChecked = !isDone;
      setIsDone(isChecked)
      const todoId = props.todo.id;
      if (isChecked === true) {
        props.todo["status"] = "Done"

      } else { props.todo["status"] = "InProgress" }

      const response = await axios.patch(`http://localhost:4000/todoapp/${todoId}`, { status: props.todo.status })
      console.log(response.data + "has been updated to " + props.todo.status)

      fetchAllTodos();
    }

    async function handleDelete() {
      const todoId = props.todo.id
      const response = await axios.delete(`http://localhost:4000/todoapp/${todoId}`)
      console.log(response.data + "ID:" + todoId + " has been deleted")
      fetchAllTodos();
    }

    return (
      <div className="todoTask">
        <h3 className="taskDescription">Task: {props.todo.task}</h3>
        <div className="isDoneGroup" >
          <label className="isDone" >Done</label>
          <input type="checkbox" className="isDoneButton" checked={isDone} onChange={handleDoneCheckbox} />
        </div>
        <hr className="divider"></hr>
        <h4 className="taskdueDate">Due date: {props.todo.dueDate}</h4>
        <button type="button" className="bin" onClick={handleDelete}> Bin </button>
      </div>
    )

  }

  return (
    <>
      <div>
        <h1 className="title">My ToDo App</h1>
        {isFirstLoad && <p>Loading...</p>}
        {message && <p>{message}</p>}
      </div>
      <div className="inputBarSection">
        {todoInput()}
      </div>
      <div className="container">
        <div className="toDoMainList">
          {TodosInProgress.map((e) => (
            <DisplayTodoTask todo={e} key={e.id} />
          ))}
        </div>
        <div className="done">
          {ToDoIsDone.map((e) => (
            <DisplayTodoTask todo={e} key={e.id} />
          ))}
        </div>

      </div>
    </>
  );
}

export default App;
