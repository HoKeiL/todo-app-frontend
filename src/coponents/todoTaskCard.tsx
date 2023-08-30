import axios from "axios";
import { useState } from "react";
import { todoViewProp } from "./interfaces";
import { baseUrl } from "../utils/baseUrl";
import moment from "moment";

export function DisplayTodoTask(props: todoViewProp): JSX.Element {
  const [isDone, setIsDone] = useState<boolean>(false); //need state to remember previous state

  async function handleDoneCheckbox() {
    const isChecked = !isDone;
    setIsDone(isChecked);
    const todoId = props.todo.id;
    if (isChecked === true) {
      props.todo["completed"] = true;
    } else {
      props.todo["completed"] = false;
    }
    const response = await axios.patch(`${baseUrl}/todoapp/${todoId}`, {
      status: props.todo.completed,
    });
    console.log(response.data + "has been updated");
  }

  async function handleDelete() {
    const todoId = props.todo.id;
    const response = await axios.delete(`${baseUrl}/todoapp/${todoId}`);
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
      <h4 className="taskdueDate">
        Due date: {moment(props.todo.duedate).format("DD-MM-YYYY")}
      </h4>
      <button type="button" className="bin" onClick={handleDelete}>
        {" "}
        bin{" "}
      </button>
    </div>
  );
}
