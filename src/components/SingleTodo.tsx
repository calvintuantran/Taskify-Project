import React, {useState, useRef, useEffect} from 'react'
import {ToDo} from "../modal"
import {AiFillEdit,AiFillDelete} from 'react-icons/ai' // import from ai icons since the beggining is ai
import {MdDone} from 'react-icons/md'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

//Ai type of icons
interface Props {
    todo: ToDo,
    todos: ToDo[], // array of todos
    setTodos:React.Dispatch<React.SetStateAction<ToDo[]>> 
    index:number;
}

const SingleToDo: React.FC<Props> = ({index,todo,todos,setTodos}) => {
  //edit states (keeps tract of edit mode and edit value)
  const [edit, setEdit] =useState<Boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  //Input Ref
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone =(id:number) =>{
    setTodos(todos.map((todo)=>todo.id ===id? {...todo, isDone:!todo.isDone}:todo)) // if the id matches invert the todo, if not then put it tehe same
  }

  const handleDelete = (id:number) =>{
    setTodos(todos.filter((todo)=> todo.id  !== id))
  }

  const handleSubmit =(e:React.FormEvent,id:number) =>{
    e.preventDefault();
    setTodos(todos.map((todo)=> (todo.id ===id?{...todo, todo:editTodo}: todo)))
    setEdit(false);
  }
  

  useEffect(()=>{
    inputRef.current?.focus()
  },[edit])

  return ( // form since we want the edit functionality
  <Draggable draggableId={todo.id.toString()} index={index}>
    {(provided,snapshot)=>(<form className={`todos_single ${snapshot.isDragging?'drag':''}`} onSubmit={(e)=>handleSubmit(e,todo.id)} ref ={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
      {edit ? (
            <input
            value ={editTodo} 
            ref ={inputRef}
            onChange={(e)=>setEditTodo(e.target.value)}
            className ="todos_single--text"
            
            />
          ) : todo.isDone ? (
            <s className="todos_single--text">{todo.todo}</s>
          ) : (
            <span className="todos_single--text">{todo.todo}</span>
          )}
        <div>
            <span className="icon" onClick ={ () => {if(!edit && !todo.isDone){
              setEdit(!edit)
            }}}><AiFillEdit/></span>
            <span className="icon" onClick ={() => handleDelete(todo.id)}> <AiFillDelete/></span>
            <span className="icon" onClick= {()=>handleDone(todo.id)}><MdDone/></span>
        </div>
    </form>)}
    </Draggable>
  )
}

export default SingleToDo