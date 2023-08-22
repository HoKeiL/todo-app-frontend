export interface todoCardProp {
    id: number;
    task: string;
    dueDate: string;
    status: "Done" | "InProgress";
}


export interface ToDoViewProp {
    todo: todoCardProp
}