import React from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';
import { Todo } from '@/types/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`flex items-center justify-between p-4 border-b ${todo.completed ? 'bg-green-50 line-through' : ''}`}>
      <span className={`flex-grow ${todo.completed ? 'text-gray-500' : ''}`}>
        {todo.text}
      </span>
      <div className="flex space-x-2">
        <button 
          onClick={() => onToggle(todo.id)} 
          className={`p-2 rounded ${todo.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          <FaCheck />
        </button>
        <button 
          onClick={() => onDelete(todo.id)} 
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
