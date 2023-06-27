import React, { useState, useContext } from 'react';

const TodoContext = React.createContext();
const TodoUpdateContext = React.createContext();
const TodoIdContext = React.createContext();
const TodoIdUpdateContext = React.createContext();
const BtnContext = React.createContext();
const BtnUpdateContext = React.createContext();

// *Custom hook
export const useTodo = () => {
  return useContext(TodoContext);
};

export const useTodoUpdate = () => {
  return useContext(TodoUpdateContext);
};

export const useTodoId = () => {
  return useContext(TodoIdContext);
};

export const useTodoIdUpdate = () => {
  return useContext(TodoIdUpdateContext);
};

export const useBtn = () => {
  return useContext(BtnContext);
};

export const useBtnUpdate = () => {
  return useContext(BtnUpdateContext);
};

export const UpdateTodoProvider = ({ children }) => {
  const [todo, setTodo] = useState('');
  const [todoId, setTodoId] = useState('');
  const [updateBtn, setUpdateBtn] = useState(false);

  return (
    <TodoContext.Provider value={todo}>
      <TodoUpdateContext.Provider value={setTodo}>
        <TodoIdContext.Provider value={todoId}>
          <TodoIdUpdateContext.Provider value={setTodoId}>
            <BtnContext.Provider value={updateBtn}>
              <BtnUpdateContext.Provider value={setUpdateBtn}>
                {children}
              </BtnUpdateContext.Provider>
            </BtnContext.Provider>
          </TodoIdUpdateContext.Provider>
        </TodoIdContext.Provider>
      </TodoUpdateContext.Provider>
    </TodoContext.Provider>
  );
};
