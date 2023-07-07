import React, { useState, useEffect, useReducer } from 'react';
import { db } from './Config/appwriteConfig';
import {
  useTodoUpdate,
  useTodoIdUpdate,
  useInputUpdate,
  useTodoReducer,
  useTodoReducerUpdate,
  ACTIONS,
} from './Context/UpdateTodoContext';
import { useUserId } from './Context/GetUserIdContext';
import swal from 'sweetalert';
import { ThreeDots } from 'react-loader-spinner';
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { Query } from 'appwrite';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(false);
  // const [userId, setUserId] = useState('');

  // TODO: Declaring custom hooks.
  const setUpdateTodo = useTodoUpdate();
  const setUpdateTodoId = useTodoIdUpdate();
  const setUpdateInput = useInputUpdate();
  const reducer = useTodoReducer();
  const forceDelete = useTodoReducerUpdate();
  const userId = useUserId();

  // *function to load data after the page loads.
  useEffect(() => {
    const loadData = async () => {
      setLoader(true);
      try {
        const getTodos = await db.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          [Query.equal('userId', userId)]
        );
        setTodos(getTodos.documents);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      loadData();
      setLoader(false);
    }, 500);
  }, [reducer]);

  // *Function to delete todo.
  const deleteTodoHandler = async (id) => {
    try {
      db.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        id
      );
      forceDelete({ type: ACTIONS.DELETE });
      swal({
        title: 'Deleted',
        text: 'Todo deleted Sucessfully',
        icon: 'success',
        dangerMode: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // *Function to complete todo
  const completeTodoHandler = async (id) => {
    try {
      await db.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        id,
        { isCompleted: true }
      );
      forceDelete({ type: ACTIONS.COMPLETE });
      swal({
        title: 'Completed',
        text: 'Todo completed Sucessfully',
        icon: 'success',
        dangerMode: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {loader ? (
        <div className="flex justify-center items-center">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#fff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <div>
          {todos &&
            todos.map((item) => (
              <div key={item.$id} className="my-4">
                <div className=" max-w-3xl mx-auto glassmorphism rounded-2xl">
                  <div className="flex p-2 justify-between">
                    {item.isCompleted ? (
                      <div className="pl-14">
                        <p className="text-blured-white font-black text-xl">
                          <del>{item.todo}</del>
                        </p>
                      </div>
                    ) : (
                      <div className="flex">
                        <input
                          type="checkbox"
                          id="check"
                          onChange={() => completeTodoHandler(item.$id)}
                        />
                        <div className="pl-4">
                          <p className="text-blured-white font-black text-xl">
                            {item.todo}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-center items-center pr-4 text-white text-xl space-x-4">
                      <AiFillEdit
                        className="hover:scale-110 ease-in-out duration-300 "
                        onClick={() => {
                          setUpdateInput(true);
                          setUpdateTodo(item.todo);
                          setUpdateTodoId(item.$id);
                        }}
                      />
                      <FaTrash
                        className="hover:scale-110 ease-in-out duration-300 "
                        onClick={() => {
                          deleteTodoHandler(item.$id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Todos;
