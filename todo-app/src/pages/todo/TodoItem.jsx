import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  filterTask,
  getAllTasks,
  updateTask,
} from "../../actions/todos/todosActions";
import TextBase from "../../components/base/textBase/TextBase";

TodoItem.propTypes = {
  task: PropTypes.object,
};
TodoItem.defaultProps = {
  task: {},
};

function TodoItem(props) {
  const task = props;
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(false);
  const [description, setDescription] = useState(task.task.description);
  const filterName = useSelector((state) => state.todos.filter);
  const disptach = useDispatch();
  const popupDelete = () => {
    confirmAlert({
      title: "Do you want to delete",
      buttons: [
        {
          label: "Yes",
          onClick: confirmDelete,
        },
        {
          label: "No",
        },
      ],
    });
  };

  const editDescription = () => {
    setEdit(!edit);
  };

  const confirmDelete = () => {
    disptach(deleteTask({ id: task.task._id }));
  };

  const doneUpdate = async (e, info) => {
    e.preventDefault();
    setEdit(false);
    await disptach(
      updateTask({
        id: task.task._id,
        completed: info.completed,
        description: info.description,
      })
    );
    if (filterName === "all") {
      disptach(getAllTasks());
    } else if (filterName === "new") {
      disptach(filterTask({ stt: false, filter: filterName }));
    } else {
      disptach(filterTask({ stt: true, filter: filterName }));
    }
  };

  useEffect(() => {
    setDescription(task.task.description);
  }, [task.task.description]);

  return (
    <div className="todo-item">
      <div className="todo-item-left">
        <div className="checkbox">
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={task.task.completed}
            onChange={(e) =>
              doneUpdate(e, {
                completed: !task.task.completed,
                description: description,
              })
            }
          />
        </div>
        {!edit ? (
          <TextBase
            component="p"
            class={active ? "active" : ""}
            variant="task-description"
            ellipsis
            click={() => setActive(!active)}
          >
            {task.task.description}
          </TextBase>
        ) : (
          <input
            type="text"
            className="todo-item-edit"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        )}
      </div>
      <div className="todo-item-right">
        {edit ? (
          <span
            className="edit-item"
            onClick={(e) =>
              doneUpdate(e, {
                completed: task.task.completed,
                description: description,
              })
            }
          >
            <i className="fas fa-check"></i>
          </span>
        ) : null}
        <span className="edit-item" onClick={editDescription}>
          <i className="fas fa-pen"></i>
        </span>
        <span className="remove-item" onClick={popupDelete}>
          &times;
        </span>
      </div>
    </div>
  );
}

export default memo(TodoItem);
