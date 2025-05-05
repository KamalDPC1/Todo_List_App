"use client"; // Add this line at the top to mark this component as a client-side component

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Todo } from '@/types/Todo';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage when they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!inputText.trim()) return;

    const newTodo: Todo = {
      id: uuidv4(),
      text: inputText.trim(),
      completed: false,
      createdAt: Date.now()
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputText('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-auto">
      {/* Todo Input */}
      <div className="flex p-4 bg-gray-100">
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="What needs to be done?"
          className="flex-grow p-2 mr-2 border rounded focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          aria-label="Add todo"
        >
          <FaPlus />
        </button>
      </div>

      {/* Todo List */}
      <div>
        {filteredTodos.map(todo => (
          <div 
            key={todo.id} 
            className={`flex items-center justify-between text-black p-4 border-b ${todo.completed ? 'bg-green-50 line-through text-gray-500' : ''}`}
          >
            <div className="flex items-center">
              <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-3 form-checkbox text-blue-500"
              />
              <span>{todo.text}</span>
            </div>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
              aria-label="Delete todo"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Todo Footer */}
      {todos.length > 0 && (
        <div className="flex justify-between items-center p-4 bg-gray-100">
          <span className="text-gray-600">{todos.filter(todo => !todo.completed).length} items left</span>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('active')}
              className={`px-2 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`px-2 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
            >
              Completed
            </button>
          </div>

          <button 
            onClick={clearCompleted}
            className="text-gray-600 hover:text-red-500"
          >
            Clear Completed
          </button>
        </div>
      )}

      {/* Empty State */}
      {todos.length === 0 && (
        <p className="text-center text-gray-500 p-4">No todos yet. Add a todo!</p>
      )}
    </div>
  );
};

export default TodoList;
