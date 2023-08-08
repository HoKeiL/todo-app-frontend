export function todoInput(): JSX.Element {
  
  return (
    <>
      <input className="inputBar" placeholder="Add new task..." />
      <p className="due-date-text"> Due date: </p>
      <input className="due-date" type="date" />
      <button className="button">Add</button>
    </>
  );
}