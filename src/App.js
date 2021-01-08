import React, {useState} from "react";
import Form from "./components/Form"
import Todolist from "./components/Todolist"
import "./components/styles.css"




function App() {
  let [inputValue, setInputValue]= useState ("");
  let [todos, setTodos] = useState([]);
  
  return (
        <div className = "main">
     <h1><span>NOT</span><span>todo</span><span>LIST</span></h1>
      <ol id="instructions">
        <li>Write down things not to do.</li>
        <li>
          If someone asks you to do said thing, just reply with: "Sorry, but
          that's on my Not Todo List."
        </li>
        <li>
          If you successfully avoided doing said thing, cross it of your list.
        </li>
      </ol>
      
      <Form inputValue = {inputValue} todos = {todos} setTodos = {setTodos} setInputValue = {setInputValue}/>
      <Todolist setTodos = {setTodos} todos = {todos} />
    </div>
  );
}

export default App;
