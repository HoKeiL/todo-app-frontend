import axios from "axios";
import { useState } from "react";
import { todoCardProp } from "./interfaces";
import apiBaseURL from "../App";

interface ToDoViewProp {
  todo: todoCardProp;
}

export function DisplayTodoTask(props: ToDoViewProp): JSX.Element {
  const [isDone, setIsDone] = useState<boolean>(false); //need state to remember previous state

  async function handleDoneCheckbox() {
    const isChecked = !isDone;
    setIsDone(isChecked);
    const todoId = props.todo.id;
    if (isChecked === true) {
      props.todo["status"] = "Done";
    } else {
      props.todo["status"] = "InProgress";
    }
    const response = await axios.patch(
      `http://localhost:4000/todoapp/${todoId}`,
      { status: props.todo.status }
    );
    console.log(response.data + "has been updated");
  }

  async function handleDelete() {
    const todoId = props.todo.id;
    const response = await axios.delete(`${apiBaseURL}/todoapp/${todoId}`);
    console.log(response.data + "ID:" + todoId + " has been deleted");
  }

  return (
    <div className="todoTask">
      <h3 className="taskDescription">Task: {props.todo.task}</h3>
      <div className="isDoneGroup">
        <p className="isDone">Done</p>
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
        bin{" "}
      </button>
    </div>
  );
}
