// src/TodoList.js
import React, { useState } from 'react';
import './TodoList.css'; // Import the CSS file for styling

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [filter, setFilter] = useState('All');
    const [editingIndex, setEditingIndex] = useState(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescriptionValue(e.target.value);
    };

    const handleAddTask = () => {
        if (inputValue.trim() !== '' && descriptionValue.trim() !== '') {
            setTasks([...tasks, { name: inputValue, description: descriptionValue, completed: false }]);
            setInputValue('');
            setDescriptionValue('');
        }
    };

    const handleEditTask = (index) => {
        setEditingIndex(index);
        setInputValue(tasks[index].name);
        setDescriptionValue(tasks[index].description);
    };

    const handleSaveTask = () => {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = { ...updatedTasks[editingIndex], name: inputValue, description: descriptionValue };
        setTasks(updatedTasks);
        setEditingIndex(null);
        setInputValue('');
        setDescriptionValue('');
    };

    const handleToggleComplete = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'All') return true;
        if (filter === 'Completed') return task.completed;
        if (filter === 'Not Completed') return !task.completed;
        return true;
    });

    return (
        <div className="todo-container">
            <h1>My Todo</h1>
            <div className="todo-inputs">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Todo Name"
                />
                <input
                    type="text"
                    value={descriptionValue}
                    onChange={handleDescriptionChange}
                    placeholder="Todo Description"
                />
                {editingIndex !== null ? (
                    <button onClick={handleSaveTask}>Save Todo</button>
                ) : (
                    <button onClick={handleAddTask}>Add Todo</button>
                )}
            </div>
            <div className="status-filter">
                <label>Status Filter:</label>
                <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Completed">Not Completed</option>
                </select>
            </div>
            <h2>My Todos</h2>
            <div className="todo-list">
                {filteredTasks.map((task, index) => (
                    <div key={index} className="todo-item">
                        <p>Name: {task.name}</p>
                        <p>Description: {task.description}</p>
                        <div className="todo-status">
                            <label>Status:</label>
                            <select
                                onChange={() => handleToggleComplete(index)}
                                value={task.completed ? 'Completed' : 'Not Completed'}
                            >
                                <option value="Completed">Completed</option>
                                <option value="Not Completed">Not Completed</option>
                            </select>
                        </div>
                        <div className="todo-actions">
                            <button className="edit-btn" onClick={() => handleEditTask(index)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDeleteTask(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
