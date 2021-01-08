import React from "react";
import "./styles.css";


function Todo({text,todo,todos,setTodos}) {
  let deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !==todo.id));
    //const deleteTodo = id => {
      //const removeArray = {...todos}.filter(todo=> todo.id !==id);
      //setTodos(removeArray)
    };
    
  
  return (
    <div className = "todo">
      <li className = "todo-item"> {text}</li>
      <button className= "complete-btn">EDIT

       

      </button>
     
       <button onClick =  {deleteHandler} className= "trash-btn">Delete
       

      </button>
      
      </div>
  )
  }
  
  export default Todo
