import Todo from "./Todo";


function Todolist({todos, setTodos}) {
  

  return (
    <div>
      <p>Things not to do:</p>
      <ul id="task-list"> </ul>
      {todos.map((todo) => (
         <Todo key = {todo.id}text={todo.text} todo={todo} todos={todos} setTodos ={setTodos}/>

      ) )}
  
      
            
        
        
        
        
        
    
      
      </div>

  );
};

export default Todolist;
