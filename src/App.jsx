import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Card from "./components/UI/Card";
import Button from "./components/UI/Button";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

const getLocalTodos = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const App = () => {
  const [inputData, setInputData] = useState("");
  const [todos, setTodos] = useState(getLocalTodos());
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [newTodo, setNewTodo] = useState(null);
  const [isWorkDone, setIsWorkDone] = useState(false);

  const addTodos = (event) => {
    //Method to add the input data into the todos array.
    event.preventDefault();
    if (!inputData) {
      alert("Please enter data");
    } else if (todos && toggleSubmit) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === newTodo) {
            return { ...todo, todo: inputData };
          }
          return todo;
        })
      );

      setToggleSubmit(false);
      setInputData("");
      setNewTodo(null);
    } else {
      const allInputData = {
        id: Math.random().toString(),
        todo: inputData,
      };
      setTodos([...todos, allInputData]);
      setInputData("");
    }
  };

  useEffect(() => {
    //using useEffect to store data in the local storage.
    localStorage.setItem("lists", JSON.stringify(todos));
  }, [todos]);

  const deleteTodos = (id) => {
    //Method to delete input data from the todos array.
    console.log(id);
    const updatedTodos = todos.filter((todo) => {
      return id !== todo.id;
    });
    setTodos(updatedTodos);
  };

  const editTodos = (id) => {
    //Method to edit input data from the todos array.
    let newEditTodo = todos.find((todo) => {
      return todo.id === id;
    });
    setToggleSubmit(true);
    setInputData(newEditTodo.todo);
    setNewTodo(newEditTodo.id);
  };

  const workDone = (id) => {
    todos.find((todo) => {
      if (todo.id === id) {
        setIsWorkDone(true);
      }
    });
  };

  return (
    <div className={styles.background}>
      <header>
        <h1 className={styles.heading}>ToDo-List</h1>
      </header>

      {/* Input Field */}
      <form onSubmit={addTodos}>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Add task"
            value={inputData}
            onChange={(event) => setInputData(event.target.value)}
          />
          <div className={styles.padding1}>
            {!toggleSubmit ? (
              <Button className={styles.button} type="submit">
                Add
              </Button>
            ) : (
              <Button className={styles.button} type="submit">
                Submit
              </Button>
            )}
          </div>
        </div>
      </form>

      {/* Todo Space */}

      <ul className={styles.padding2}>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {!isWorkDone ? (
                <Card className={styles.cards}>
                  <div className={styles.insideCard}>
                    <div className={styles.content}>
                      <input
                        type="checkbox"
                        id="check"
                        onClick={() => workDone(todo.id)}
                      />
                      <label>{todo.todo}</label>
                    </div>
                    <div className={styles.icon}>
                      <FaTrash
                        className={styles.icon1}
                        onClick={() => deleteTodos(todo.id)}
                      />
                      <AiFillEdit
                        className={styles.icon2}
                        onClick={() => editTodos(todo.id)}
                      />
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className={styles.cards}>
                  <div className={styles.insideCard}>
                    <div className={styles.content}>
                      {/* <input
                      type="checkbox"
                      id="check"
                      onClick={() => setIsWorkDone(true)}
                    /> */}
                      <label>
                        <del>{todo.todo}</del>
                      </label>
                    </div>
                    <div className={styles.icon}>
                      <FaTrash
                        className={styles.icon1}
                        onClick={() => deleteTodos(todo.id)}
                      />
                      <AiFillEdit
                        className={styles.icon2}
                        onClick={() => editTodos(todo.id)}
                      />
                    </div>
                  </div>
                </Card>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
