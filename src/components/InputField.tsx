import React, {useRef} from 'react'
import "./styles.css"

//Create an Interface for Props

//Setting the Types for To Do
interface Props{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>> // type of setToDo // take them from hovering over the original state
      handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
    //useRef => hooking that particular component html
    //Adding type to input ref (hover the input value and put it) // Blur shifts the focus from the input box to ouside
  return (
    <form className='input' onSubmit={(e) => {handleAdd(e); inputRef.current?.blur()}}>
        
        <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref= {inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="input_box"
      />
        <button className="input_submit" type="submit" >Submit</button>
    </form>
  )
}

export default InputField