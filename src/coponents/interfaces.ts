export interface todoCardProp {
  id: number;
  task: string;
  duedate: string;
  completed: boolean;
}

export interface todoViewProp {
  todo: todoCardProp;
}

export interface todoStateProp {
  NewTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  DueDate: string;
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
}
