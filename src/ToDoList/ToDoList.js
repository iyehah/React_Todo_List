import React from "react";
import "./ToDoList.css";

const ToDo = (props) => {
    return (
        <React.Fragment>
            <ul className="appToDoHolder">
                {(props.item).map((item) => {
                    return (
                        <div className="appToDo" key={item.id}>
                            <li>{item.toDo}</li>
                            <button
                                className="appDelete"
                                title="delete"
                                onClick={() => props.onDelete(item.id)}
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}
            </ul>
        </React.Fragment>
    );
};

export default ToDo;