import React, { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from './Appwrite/appwriteConfig';
import {
  useTodo,
  useBtn,
  useTodoId,
  useTodoIdUpdate,
} from './Context/UpdateTodoContext';
import Button from './UI/Button';

const TodoForm = () => {
  const [todo, setTodo] = useState('');
  const updateTodo = useTodo();
  const updateTodoId = useTodoId();
  const setUpdateTodoId = useTodoIdUpdate();
  const updateBtn = useBtn();

  const submitTodoHandler = async (e) => {
    e.preventDefault();
    try {
      await db.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        uuidv4(),
        {
          todo,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateTodoHandler = async (e) => {
    e.preventDefault();
    setTodo(updateTodo);
    try {
      const promise = await db.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        updateTodoId,
        patch({
          todo,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const btnText = useMemo(() => {
    return updateBtn ? 'Update' : 'Add';
  }, [updateBtn]);

  const fromSubmit = updateBtn ? updateTodoHandler : submitTodoHandler;

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form
        onSubmit={fromSubmit}
        className="flex justify-center mb-10 space-x-6"
      >
        <input
          type="text"
          className="border-2 p-2 w-2/3 rounded-2xl  outline-none bg-transparent text-white"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          defaultValue={todo}
        />
        <Button text={btnText} />
      </form>
    </div>
  );
};

export default TodoForm;
