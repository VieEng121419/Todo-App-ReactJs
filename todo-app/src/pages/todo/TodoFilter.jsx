import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterTask, getTasks } from "../../actions/todos/todosActions";
import BaseButton from "../../components/base/baseButton/BaseButton";
import TextBase from "../../components/base/textBase/TextBase";

function TodoFilter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.todos.count);
  const change = (stt, filter) => {
    dispatch(filterTask({ stt, filter }));
  };
  const all = () => {
    dispatch(
      getTasks({
        filter: "all",
        limit: 4,
        skip: count - 1 * 4,
      })
    );
  };
  return (
    <div className="filter__container">
      <BaseButton class="filter" click={() => change(false, "new")}>
        <TextBase component="p" variant="filter" size="xs">
          New
        </TextBase>
      </BaseButton>
      <BaseButton class="filter" click={() => change(true, "completed")}>
        <TextBase component="p" variant="filter" size="xs">
          Completed
        </TextBase>
      </BaseButton>
      <BaseButton class="filter" click={() => all()}>
        <TextBase component="p" variant="filter" size="xs">
          All
        </TextBase>
      </BaseButton>
    </div>
  );
}

export default TodoFilter;
