import React, { useState, useEffect } from 'react';
import { db } from './Appwrite/appwriteConfig';
import {
  useTodoUpdate,
  useTodoIdUpdate,
  useBtnUpdate,
  useBtn,
} from './Context/UpdateTodoContext';
import { ThreeDots } from 'react-loader-spinner';
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';

const Todos = () => {
  const [todos, setTodos] = useState();
  const [loader, setLoader] = useState(false);
  const setUpdateTodo = useTodoUpdate();
  const setUpdateTodoId = useTodoIdUpdate();
  const setUpdateBtn = useBtnUpdate();
  const updateBtn = useBtn();

  useEffect(() => {
    const loadData = async () => {
      setLoader(true);
      try {
        const getTodos = await db.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID
        );
        setTodos(getTodos.documents);
      } catch (err) {
        console.log(err);
      }
    };
    loadData();
    setLoader(false);
  }, [todos]);
  // const updateTourHandler = async (id) => {
  //   try {
  //     setTodo();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const deleteTodoHandler = async (id) => {
    try {
      db.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        id
      );
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
                    <div className="flex">
                      <input type="checkbox" id="check" />
                      <div className="pl-4">
                        <p className="text-blured-white font-black text-xl">
                          {item.todo}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center pr-4 text-white text-xl space-x-4">
                      <AiFillEdit
                        className="hover:scale-110 ease-in-out duration-300 "
                        onClick={() => {
                          setUpdateTodo(item.todo);
                          setUpdateTodoId(item.$id);
                          setUpdateBtn(!updateBtn);
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
