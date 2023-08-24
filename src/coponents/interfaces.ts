export interface todoCardProp {
  id: number;
  task: string;
  duedate: string;
  completed: boolean;
}

export interface ToDoViewProp {
  todo: todoCardProp;
}
