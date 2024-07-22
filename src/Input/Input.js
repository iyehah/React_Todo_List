import React, { useState, useEffect } from "react";
import ToDoList from "../ToDoList/ToDoList";
import "./Input.css";
import { nanoid } from "nanoid";

const getLocalItems = () => {
  let items = localStorage.getItem("TASK");
  if (items) {
    return JSON.parse(items);
  } else {
    return [];
  }
};

const Input = () => {
  const [toDoList, setToDoList] = useState(getLocalItems());
  const [inputData, setInputData] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (inputData.trim().length <= 0) return;
    setInputData("");
    setToDoList((prevValue) => [
      ...prevValue,
      { toDo: inputData, id: nanoid() }
    ]);
  };

  const onChangeHandler = (event) => {
    setInputData(event.target.value);
  };

  const onDeleteHandler = (itemID) => {
    setToDoList((oldValues) =>
      oldValues.filter((item) => item.id !== itemID)
    );
  };

  const removeAllHandler = () => {
    setToDoList([]); // Clear all items
  };

  useEffect(() => {
    const stringifyToDoList = JSON.stringify(toDoList);
    localStorage.setItem("TASK", stringifyToDoList);
  }, [toDoList]);

  return (
    <React.Fragment>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={inputData}
          placeholder="Add Task"
          className="appInput"
          onChange={onChangeHandler}
        />
      </form>

      {toDoList.length === 0 ? (
        <p className="appNoTasks">You don't have any tasks.</p>
      ) : (
        <>
          {toDoList.length >= 2 && (
            <button
              className="appRemoveAll"
              title="Remove All"
              onClick={removeAllHandler}
            >
              Remove All
            </button>
          )}

          <ToDoList
            item={toDoList}
            onDelete={onDeleteHandler}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default Input;
