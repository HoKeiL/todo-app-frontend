import moment from "moment";
import { todoStateProp } from "./interfaces";

export function TodoInput({
  NewTask,
  setNewTask,
  DueDate,
  setDueDate,
}: todoStateProp): JSX.Element {
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
        maxLength={50}
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
    </div>
  );
}
