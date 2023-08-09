import moment from "moment";

export function todoInput(): JSX.Element {
  const todayDate = moment(new Date()).format("YYYY-MM-DD");
  return (
    <>
      <input className="inputBar" placeholder="Add new task..." />
      <p className="due-date-text" > Due date: </p>
      <input className="due-date" type="date" placeholder="YYYY-MM-DD" min={todayDate}   />
      <button className="button">Add</button>
    </>
  );
}
