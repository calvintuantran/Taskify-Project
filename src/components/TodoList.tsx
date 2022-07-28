import React from "react";
import "./styles.css";
import { ToDo } from "../modal";
import SingleToDo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: ToDo[]; //array of type ToDo
  //setitng the type for setToDos (hover over state value)
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  completedTodos: ToDo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}
const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      {/*Pass in an ID and into a callback function */}
      {/*Provided => provide to parent div of current drop */}
      <Droppable droppableId="TodosList">
        {(provided,snapshot) => (
          <div //snapshot is added for dragging over affect
            className={`todos ${snapshot.isDraggingOver?"dragactive": ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {" "}
            {/*inner ref lets you know its a provided drop */}{" "}
            {/*Passing index to recongize which one is moving */}
            <span className="todos_heading">Task Assigned</span>
            {todos.map((todo,index) => (
              <SingleToDo
                index ={index}
                key={todo.id}
                setTodos={setTodos}
                todo={todo}
                todos={todos}
              />
            ))}
            {/*Fix the floating error */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided,snapshot) => (
          <div className=  {`todos remove ${snapshot.isDraggingOver?"dragactive": ''}`}  ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos_heading">Completed Tasks </span>
            {completedTodos.map((todo,index) => (
              <SingleToDo
                index ={index}
                key={todo.id}
                setTodos={setCompletedTodos}
                todo={todo}
                todos={completedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
