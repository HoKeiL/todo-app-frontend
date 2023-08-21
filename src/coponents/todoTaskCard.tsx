export interface todoCardProp {
    id: number;
    task: string;
    dueDate: string;
    done: boolean;
}

interface ToDoViewProp {
    todo: todoCardProp
}

export function DisplayTodoTask(props: ToDoViewProp): JSX.Element {

    function handleClick() {
        console.log("bin task")
    }

    return (
        <div className="todoTask">
            <h3 className="taskDescription">Task: {props.todo.task}</h3>
            <div className="isDoneGroup" >
                <p className="isDone" >Done</p>
                <input type="checkbox" className="isDoneButton" value='false' />
            </div>
            <hr className="divider"></hr>
            <h4 className="taskdueDate">Due date: {props.todo.dueDate}</h4>
            <button type="button" className="bin" onClick={handleClick}> bin </button>
        </div>
    )

}
