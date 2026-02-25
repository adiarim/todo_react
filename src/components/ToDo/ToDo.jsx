import React, { useRef } from 'react';
import { useTodoStore } from "../../store/todoStore";
import './style.css'

const ToDo = () => {
    const inputRef = useRef(null);
    const { todos, addTodo, removeTodo, toggleTodo } = useTodoStore();

    const handleAdd = () => {
        if (inputRef.current.value.trim()) {
            addTodo(inputRef.current.value);
            inputRef.current.value = '';
        }
    };

    return (
        <div className='container'>
            <h1>Мои дела ✍️</h1>
            <div className='input-wrapper'>
                <input 
                    className='input' 
                    ref={inputRef} 
                    placeholder='Что нужно сделать?'
                />
                <button className='add-btn' onClick={handleAdd}>Добавить</button>
            </div>
            <ul className='list-container'>
                {todos.map(todo => (
                    <li className='todo-item' key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        <span className='todo-text' onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                        <button className='delete-btn' onClick={() => removeTodo(todo.id)}>х</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDo