export interface todoCardProp {
  id: number;
  task: string;
  dueDate: string;
  completed: boolean;
}

export interface ToDoViewProp {
  todo: todoCardProp;
}
