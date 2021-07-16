import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import Pagination from "../../components/pagination/Pagination";
import globalComponent from "../../global-components-context";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  getAllTasks,
  getTasks,
} from "../../actions/todos/todosActions";
import BaseButton from "../../components/base/baseButton/BaseButton";
import TextBase from "../../components/base/textBase/TextBase";
import Error from "../../components/base/textErrorBase/TextErrorBase";

function TodoList() {
  const Context = useContext(globalComponent);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const list = useSelector((state) => state.todos.todos);
  const isLoading = useSelector((state) => state.todos.loading);
  const count = useSelector((state) => state.todos.count);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getAllTasks());
    if (count > 4) {
      dispatch(
        getTasks({
          filter: "all",
          limit: 4,
          skip: count - 1 * 4,
        })
      );
    } else {
      dispatch(
        getTasks({
          filter: "all",
          limit: 4,
          skip: 4 - 1 * 4,
        })
      );
    }
  }, [dispatch, count]);

  const addTodo = async () => {
    await dispatch(addTask({ description: newTodo }));
    await setNewTodo("");
  };

  return (
    <div className="todo-list">
      <TextBase component="h1" weight="bold" variant="title-todos">
        MY TASKS
      </TextBase>
      <div className="todo__form">
        <form onSubmit={handleSubmit(addTodo)}>
          <input
            type="text"
            className="todo__input"
            value={newTodo}
            placeholder="What need to be done?"
            {...register("newTodo", {
              required: "This is required",
              maxLength: {
                value: 1000,
                message: "You exceeded the max length ",
              },
            })}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          {errors.newTodo && <Error>{errors.newTodo.message}</Error>}
          <BaseButton class="addtask" type="submit">
            <i className="fas fa-plus"></i>
          </BaseButton>
        </form>
      </div>
      {list.map((value, key) => {
        return <TodoItem task={value} key={key} />;
      })}
      <div className="function__button">
        <Pagination />
        <TodoFilter />
      </div>
      {isLoading ? <Context.Loading /> : null}
    </div>
  );
}

export default TodoList;
