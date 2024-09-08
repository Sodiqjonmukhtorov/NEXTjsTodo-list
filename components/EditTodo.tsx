import React, { useState, useLayoutEffect } from "react";
import { EditProps, Todos } from "../interfaces/types";

const EditTodo = ({
  todos,
  setTodos,
  editTodo,
  setEdit,
}: Todos & EditProps) => {
  const [updatedDeadline, setUpdatedDeadline] = useState<string>("");
  const [updatedtodo, setUpdatedTodo] = useState<string>("");

  const handleUpdate = () => {
    const newTodos = todos.map((todo) => {
      if (todo.id === editTodo.id) {
        return {
          todo: updatedtodo,
          deadline: updatedDeadline,
          bg: editTodo.bg,
          id: editTodo.id,
        };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
    setEdit(false);
  };

  useLayoutEffect(() => {
    setUpdatedDeadline(editTodo.deadline);
    setUpdatedTodo(editTodo.todo);
  }, [editTodo.deadline, editTodo.todo]);

  return (
    <div className='flex mb-8 border-2 border-indigo-600 rounded-lg '>
      <input
        type='text'
        name='todo'
        placeholder='Add a todo'
        value={updatedtodo}
        className='flex-1 px-3 text-sm border-2 border-indigo-600 border-solid focus:outline-none'
        onChange={(e) => setUpdatedTodo(e.target.value)}
      />
      <input
        type='date'
        name='deadline'
        value={updatedDeadline}
        placeholder='deadline'
        className='w-[30%] border-2 border-indigo-600 border-solid text-sm px-2 focus:outline-none'
        onChange={(e) => setUpdatedDeadline(e.target.value)}
      />
      <button
        onClick={() => handleUpdate()}
        className='px-4 py-1 text-sm text-white capitalize transition-all duration-300 ease-in-out bg-indigo-600 hover:bg-red-200'
      >
        update Todo
      </button>
    </div>
  );
};

export default EditTodo;
