import React, { useState } from 'react'

function Todo() {
const [task,setTask]=useState('')
    const handleClick=async(e)=>{
        e.preventDefault();
        
        try{
            const response=await fetch("http://localhost:5000/api/todo",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({task})
            });
            if(response.ok){
                const newTodo=await response.json();
                console.log(newTodo)
                setTask('');
                alert(`New todo added: ${newTodo.task}`);
                window.location.reload();
            } else {
              alert('Error adding todo');
            }

        }catch (error) {
      console.error('Error adding todo:', error);
      alert('Error adding todo');
    }
    }
    const handleChange = (event) => {
        setTask(event.target.value);
      };
  return (
    <div>
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Enter Your Task</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={task} onChange={handleChange}/>
    <div id="emailHelp" className="form-text">New Tasks Will Be At The End</div>
  </div>
 
  
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
</form>
    </div>
  )
}

export default Todo
