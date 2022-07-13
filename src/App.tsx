/*https://www.youtube.com/watch?v=FJDVKeh7RJI */
import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { ToDo } from "./modal";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
//Install Dependenies in Typescript => need to install types// https://www.npmjs.com/package/@types/react-beautiful-dnd

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>(""); //define as a string using typscript
  const [todos, setTodos] = useState<ToDo[]>([]); //Creating an Array of a type Interfae (ToDo interface)
  const [completedTodos, setCompletedTodos] = useState<ToDo[]>([]);

  //putting type for Event
  /*
  const handleAdd =(e:React.FormEvent) =>{
    e.preventDefault();
    if(todo){
      //... todos as to the array
      //id:Date.now() => set the array to be current, todo adds to the aray, isDone determines if its done or not
      setToDos([...todos,{id: Date.now(), todo, isDone:false}])
      setToDo('')
    }
  }
  */

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };
  console.log(todos);

  /*Drop Result */
  const onDragEnd=(result:DropResult) =>{
    const{source,destination} = result;
    console.log(result)
    /*base cases */
    if(!destination){
      return
    }
    if(destination.droppableId === source.droppableId && destination.index ===source.index){
      return;
    }
    /*active => all the todos in the state */
    let add,
    active =todos, // provide it in set todo state
    complete =completedTodos;

    //When we manipulate active variable =>manipulate it in set todo state  
    // check if came from todo list
    if(source.droppableId ==='TodosList'){
      add=active[source.index] //take the particular item ( source.index the original)
      active.splice(source.index,1)// removing the item from the add
    }
    else{
      //complete case
      //Taking that particular to do
      add = complete[source.index];
      complete.splice(source.index,1);
    }
    if(source.droppableId ==='TodosRemove'){
      active.splice(destination.index,0,add)// adding item to the array
    }
    else{
      //complete case
      //Taking that particular to do
      complete.splice(destination.index,0,add);
    }
    //Adding into state
    setCompletedTodos(complete)
    setTodos(active)

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
