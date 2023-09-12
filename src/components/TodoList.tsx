
import SingleTodo from './SingleTodo'
import { TodoListProps } from '../Interfsce'

const TodoList:React.FC<TodoListProps> = ({todos,todoChange,setTodoChange}) => {


  return (
    <div className='TodoList flex flex-row justify-center items-start my-4'>
        <div key={'first'} className="singleTodoWidth Notcomplite px-2 text-center  border-2 min-h-[300px] w-[420px] p-2 mt-1">
        <h2 className='text-[#f1eeee] text-[20px] font-[600]'>Incomplited Task</h2>
          { todos.filter((data)=>data.isDone==false).length>0?(
               todos.filter((data)=>data.isDone==false).map((todoInfo)=>(<SingleTodo id={todoInfo.id} todoInfo={todoInfo} setTodoChange={setTodoChange} todoChange={todoChange} />))
          ):
          (<div className='min-h-[267px] flex items-center justify-center'><p>No any task</p></div>)
          }
        </div>
        <div key={'second'} className="singleTodoWidth compliteTask mx-2 text-center border-2 min-h-[300px] w-[420px] p-2 mt-1">
        <h2 className='text-[#f1eeee] text-[20px] font-[600]'>Complited Task</h2>
        {
          todos.filter((data)=>data.isDone==true).length>0?(
               todos.filter((data)=>data.isDone==true).map((todoInfo)=> (<SingleTodo id={todoInfo.id} todoInfo={todoInfo} setTodoChange={setTodoChange} todoChange={todoChange} />))
               ):
          (<div className='min-h-[267px] flex items-center justify-center'><p>No any task</p></div>)
          }
        </div>
    </div>
  )
}

export default TodoList