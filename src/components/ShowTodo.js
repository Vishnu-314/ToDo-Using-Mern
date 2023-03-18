import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/todo');
            const data = await response.json();
            setTodos(data.result);
            console.log(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    if (todos === null) {
        return <h1>Loading...</h1>;
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/todo/delete/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);
            // Reload the page after deleting the todo
            window.location.reload();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEdit = async (id) => {
        const newTask = prompt('Enter the new task:');
        try {
            const response = await fetch(`http://localhost:5000/api/todo/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task: newTask,
                }),
            });
            const data = await response.json();
            console.log(data);
            // Reload the page after editing the todo
            window.location.reload();
        } catch (error) {
            console.error('Error editing todo:', error);
        }
    };

    return (
        <div className='.bg-dark-subtle'>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id} className='d-flex '>
                        <div className='p-2 flex-grow-1'> {todo.task} </div>
                        <i className="fa-solid fa-trash mx-2 p-2" onClick={() => handleDelete(todo._id)}></i>
                        <i className="fa-regular fa-pen-to-square mx-2 p-2" onClick={() => handleEdit(todo._id)}></i>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input border border-secondary" id="exampleCheck1" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
