import React, { useState ,useEffect} from "react";
import "./App.css";
import { Itodo } from "./Interfsce";
import axios from 'axios';
import { toast,Toaster } from "react-hot-toast";
import TodoList from "./components/TodoList";
import Spinner from './components/Spinner'

const App: React.FC = () => {
  // const baseURL = 'http://127.0.0.1:4400'
  const baseURL = 'https://todoapp-typescript.onrender.com'
  const [todo, setTodo] = useState<string>("");
  const [todoChange, setTodoChange] = useState(false);
  const [todos, setTodos] = useState<Itodo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

const handleCahnge = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setTodo(e.target.value);
      console.log(todo)
}

  const handleSubmit = async(e:React.FormEvent)=>{
  e.preventDefault();
  if(todo==""){
    return toast('First enter your task',{
      style:{  background: 'white',  color:'#F67600',width:'260px'},
      icon:'⚠️',
    });
  }
  
  try {
    setLoading(true)
    const res = await axios.post(`${baseURL}/api/todos`,{content:todo,isDone:false});
    if(res.status==201){
      console.log(res);
      setTodo("");
      setTodoChange(true);
      setLoading(false)
      toast.success('Task added successfully')
    }
    
  } catch (error) {
    console.log(error);
    setTodo("");
    setLoading(false)
    toast.error("Somthing went wrong or network connection ?");
  }
  }
  const getAllTodo = async()=>{
      try {
        const res = await axios.get(`${baseURL}/api/todos`);
        if(res.status===200){
          console.log(res);
          setTodos(res.data);
          
        }
      } catch (error) {
        console.log(error);
      }
  }


  useEffect(()=>{
    getAllTodo();
    setTodoChange(false);
  },[todoChange]);


  return (
    <>
      <h1 className="text-center text-[30px] font-[500] my-3 underline">
        Task Note
      </h1>

      <div className="taskInput w-full flex flex-col items-center justify-center ">
        <form onSubmit={handleSubmit} className=" w-[90%] flex flex-row items-center justify-center ">
          
          <input
            type="text "
            onChange={handleCahnge}
            value={todo}
            placeholder="Enter your task"
            className=" px-5 py-3 w-[500px]"
          />
          <button type="submit" className="go-btn rounded-full border-2 font-[600] p-3 text-[18px] mx-4 bg-white text-[#088ae0]">
           {
            !loading?<p>Go</p>:<Spinner/>
           }
  
          </button>
        </form>
      </div>
      <TodoList todos={todos} setTodos={setTodos} setTodoChange={setTodoChange} todoChange={todoChange}  />
      <Toaster/>
    </>
  );
};

export default App;
