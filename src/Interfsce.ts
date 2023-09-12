export interface Itodo {
    id:string;
    content:string;
    isDone:boolean;
}

export interface TodoListProps {
    todos: Itodo[]; // Assuming Itodo is your todo item type
    setTodos: React.Dispatch<React.SetStateAction<Itodo[]>>;
    todoChange:boolean,
    setTodoChange: React.Dispatch<React.SetStateAction<boolean>>;
    // deleteTodo: (id: string) => Promise<void>; // Add deleteTodo prop

  }
  interface IdeleteTodo {

  }