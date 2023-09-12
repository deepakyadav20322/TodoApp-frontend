import React,{useState} from "react";
import {  AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Itodo } from "../Interfsce";
import axios from "axios";
import Spinner from "./Spinner";
interface SingleTodoProps {
  todoInfo: Itodo;
  id: string;
  todoChange: boolean;
  setTodoChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleTodo: React.FC<SingleTodoProps> = ({todoInfo, id,todoChange,setTodoChange,}) => 
       {
  // const baseURL = "http://127.0.0.1:4400";
  const baseURL = "https://todoapp-typescript.onrender.com";
  const [loading , setLoading] = useState<boolean>(false);
  const [loadingDelete , setLoadingDelete] = useState<boolean>(false);

  const deleteTodo = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    try {
      setLoadingDelete(true)
      const res = await axios.delete(`${baseURL}/api/todos/${id}`);
      if(res.status===204){
      console.log(res);
      setTodoChange(true);
      setLoadingDelete(false)
      }
    } catch (error) {
      console.log(error);
      setLoadingDelete(false)
    }
  };

  const isComplite = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    try {
      setLoading(true)
      const res = await axios.post(`${baseURL}/api/todos/isDone/${id}`);
      if(res.status===200){
      console.log(res);
      setTodoChange(true);
      setLoading(false)
      }
    } catch (error) {
      console.log("error on isDone", error);
      setLoading(false)
    }
  };

  return (
    <div
      key={id}
      className="singleTodo w-[400px] p-2 my-2 flex flex-row justify-between items-center border-2 border-black rounded bg-white"
    >
      <p className={`p-2 text-left ${todoInfo.isDone ? "line-through" : ""} `}>
        {todoInfo.content}
      </p>
      <div className="flex flex-row justify-center items-center">
        {/* <AiFillEdit size={30} className="mx-[3px] cursor-pointer" /> */}
        <div className="border-[1px] ">{!loadingDelete?(
        <AiFillDelete
          onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
            deleteTodo(e, id)
          }
          size={30}
          color="red"
          className="mx-[3px] p-[4px] hover:bg-slate-200 transition-all duration-200 cursor-pointer"
        />):(<Spinner/>)
        }</div>

        <div className="border-[1px]">
          {!loading?
        (<MdDone
          onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
            isComplite(e, id)
          }
          size={30}
          className="mx-[3px] cursor-pointer  p-[3px]  hover:bg-slate-200 transition-all duration-200"
          color="green"
        />):(<Spinner/>)
       }
        </div>
       
      </div>
    </div>
  );
};

export default SingleTodo;
