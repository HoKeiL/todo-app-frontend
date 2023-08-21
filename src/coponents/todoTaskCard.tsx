export interface todoCardProp {
    id: number;
    task: string;
    dueDate: string;
    status: boolean;
}

interface ToDoViewProp {
    todo: todoCardProp
}

export function DisplayTodoTask(props: ToDoViewProp): JSX.Element {

    function handleClick() {
        console.log("bin task")
    }

    return (
        <div className="toDotask">
            <h1>Task: {props.todo.task}</h1>
            <input type="radio" className="isDone" value="Done" />
            <hr></hr>
            <p>Due date: {props.todo.dueDate}</p>
            <button type="button" className="bin" onClick={handleClick}> bin </button>
        </div>
    )

}
