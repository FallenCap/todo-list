import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from './Appwrite/appwriteConfig';
import {
  useTodo,
  useTodoUpdate,
  useInput,
  useTodoId,
  useTodoReducerUpdate,
  useInputUpdate,
  ACTIONS,
} from './Context/UpdateTodoContext';
import Button from './UI/Button';
import swal from 'sweetalert';

const TodoForm = () => {
  const [todo, setTodo] = useState('');
  const [updatedTodo, setUpdatedTodo] = useState('');
  // TODO: Declaring custom hooks.
  const updateTodo = useTodo();
  const setUpdateTodo = useTodoUpdate();
  const updateTodoId = useTodoId();
  const updatedInput = useInput();
  const forceAdd = useTodoReducerUpdate();
  const setUpdateInput = useInputUpdate();

  useEffect(() => {
    setUpdatedTodo(updateTodo);
  }, [updateTodo]);

  // *function to add todo.
  const submitTodoHandler = async (e) => {
    e.preventDefault();

    if (todo.trim().length !== 0) {
      try {
        await db.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          uuidv4(),
          {
            todo,
          }
        );
        setTodo('');
      } catch (err) {
        console.log(err);
      }
      forceAdd({ type: ACTIONS.ADD });
      swal({
        title: 'Added',
        text: 'Todo Added Sucessfully',
        icon: 'success',
        dangerMode: false,
      });
    } else {
      swal({
        title: 'Invalid!',
        text: 'Input must not be empty.',
        icon: 'warning',
        dangerMode: true,
      });
    }
  };

  // *Update function
  const updateTodoHandler = async (e) => {
    e.preventDefault();
    // console.log(updateTodoId);
    try {
      await db.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        updateTodoId,
        { todo: updatedTodo }
      );
    } catch (err) {
      console.log(err);
    }
    forceAdd({ type: ACTIONS.ADD });
    setUpdateInput(false);
    swal({
      title: 'Updated',
      text: 'Todo Updated Sucessfully',
      icon: 'success',
      dangerMode: false,
    });
    setUpdatedTodo('');
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      {updatedInput ? (
        <form
          onSubmit={updateTodoHandler}
          className="flex justify-center mb-10 space-x-6"
        >
          <input
            type="text"
            className="border-2 p-2 w-2/3 rounded-2xl  outline-none bg-transparent text-white"
            onChange={(e) => {
              setUpdateTodo(e.target.value);
            }}
            value={updatedTodo}
          />
          <Button text={'Update'} />
        </form>
      ) : (
        <form
          onSubmit={submitTodoHandler}
          className="flex justify-center mb-10 space-x-6"
        >
          <input
            type="text"
            className="border-2 p-2 w-2/3 rounded-2xl  outline-none bg-transparent text-white"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            value={todo}
          />
          <Button text={'Add'} />
        </form>
      )}
    </div>
  );
};

export default TodoForm;
