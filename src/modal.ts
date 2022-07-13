export interface ToDo {
  id: number;
  todo: string;
  isDone: boolean;
}

//Applying Reducer

import { useReducer } from "react";
import { MdCallToAction } from "react-icons/md";

//TodoReducer takes same type of action as the reducer
//state => array of to do
//Action => add todo, remove todo, and done




//Understand how to Intergrate Typescript inside the action
/*
type Actions =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number }
  | { type: "done"; payload: number };

//Action.Payload has the information inside
const ReducerExample = (state: ToDo[], action: Actions) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];

    case "remove":
      return state.filter((todo) => todo.id !== action.payload);

    case "done":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    default:
      return state;
  }
};
*/