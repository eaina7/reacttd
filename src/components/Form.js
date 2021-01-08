import React from 'react'


function Form({setInputValue,inputValue,todos,setTodos }) {
    let inputHandler = (e) => {
        setInputValue(e.target.value);
        

    };
    let submitHandler = (e) => {
        e.preventDefault();
        setTodos ([...todos, {text:inputValue, completed: false, id:Math.random()*1000}]);
        setInputValue =("");

    };
    return (
         
        <form action="">
        <p>What are you NOT doing today:</p>
        <div className="inputArea shadow">
          <input value = {inputValue} onChange = {inputHandler}
            type="text"
            name="task"
            id="task"
            placeholder="your Task"
          />
          <button onClick = {submitHandler}id="add">Add</button>
        </div>
        

      </form>
        
    )
}

export default Form
