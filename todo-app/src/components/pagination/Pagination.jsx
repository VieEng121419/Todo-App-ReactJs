import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../actions/todos/todosActions";
import "./pagination.scss";

function Pagination(props) {
  const count = useSelector((state) => state.todos.count);
  const dispatch = useDispatch();
  var [pageIndex, setPageIndex] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [prevPage, setPrevPage] = useState(false);

  useEffect(() => {
    if (count <= 4) {
      setNextPage(true);
      setPrevPage(true);
    } else {
      setNextPage(true);
      setPrevPage(false);
    }
    setPageIndex(1);
  }, [count]);

  const checkLimitNext = () => {
    if (count - pageIndex * 4 <= 0) {
      setPrevPage(true);
      return count - (pageIndex - 1) * 4;
    } else {
      return 4;
    }
  };

  const next = () => {
    setPageIndex((pageIndex += 1));
    setNextPage(false);
    dispatch(
      getTasks({
        filter: "all",
        limit: checkLimitNext(),
        skip: count - pageIndex * 4 <= 0 ? 0 : count - pageIndex * 4,
      })
    );
  };
  const prev = () => {
    setPageIndex((pageIndex -= 1));
    if (pageIndex === 1) {
      setPrevPage(false);
      setNextPage(true);
    } else {
      setPrevPage(false);
      setNextPage(false);
    }
    dispatch(
      getTasks({
        filter: "all",
        limit: 4,
        skip: count - pageIndex * 4,
      })
    );
  };

  return (
    <div className="button__pagination">
      <button
        className={nextPage ? "disablePrev" : null}
        disabled={nextPage ? true : false}
        onClick={prev}
      >
        <i className="fas fa-angle-left"></i>
      </button>
      <button
        className={prevPage ? "disableNext" : null}
        disabled={prevPage ? true : false}
        onClick={next}
      >
        <i className="fas fa-angle-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
