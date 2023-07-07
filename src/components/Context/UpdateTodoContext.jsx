import React, { useState, useContext, useReducer } from 'react';

const TodoContext = React.createContext();
const TodoUpdateContext = React.createContext();
const TodoIdContext = React.createContext();
const TodoIdUpdateContext = React.createContext();
const InputFieldContext = React.createContext();
const InputFieldUpdateContext = React.createContext();
const TodoReducerContext = React.createContext();
const TodoReducerUpdateContext = React.createContext();

export const ACTIONS = {
  ADD: 'addReducer',
  DELETE: 'deleteReducer',
  COMPLETE: 'completeReducer',
};

const reducer = (item, action) => {
  if (action.type === ACTIONS.ADD || action.type === ACTIONS.COMPLETE) {
    return item + 1;
  }
  if (action.type === ACTIONS.DELETE) {
    return item - 1;
  }
};

// *Custom hooks
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

export const useInput = () => {
  return useContext(InputFieldContext);
};

export const useInputUpdate = () => {
  return useContext(InputFieldUpdateContext);
};

export const useTodoReducer = () => {
  return useContext(TodoReducerContext);
};

export const useTodoReducerUpdate = () => {
  return useContext(TodoReducerUpdateContext);
};

export const UpdateTodoProvider = ({ children }) => {
  const [todo, setTodo] = useState('');
  const [todoId, setTodoId] = useState('');
  const [update, setUpdate] = useState(false);
  const [todoReducer, forceUpdate] = useReducer(reducer, 0);

  return (
    <TodoContext.Provider value={todo}>
      <TodoUpdateContext.Provider value={setTodo}>
        <TodoIdContext.Provider value={todoId}>
          <TodoIdUpdateContext.Provider value={setTodoId}>
            <InputFieldContext.Provider value={update}>
              <InputFieldUpdateContext.Provider value={setUpdate}>
                <TodoReducerContext.Provider value={todoReducer}>
                  <TodoReducerUpdateContext.Provider value={forceUpdate}>
                    {children}
                  </TodoReducerUpdateContext.Provider>
                </TodoReducerContext.Provider>
              </InputFieldUpdateContext.Provider>
            </InputFieldContext.Provider>
          </TodoIdUpdateContext.Provider>
        </TodoIdContext.Provider>
      </TodoUpdateContext.Provider>
    </TodoContext.Provider>
  );
};
