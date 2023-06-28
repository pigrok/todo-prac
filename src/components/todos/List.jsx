import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTodos } from "../../redux/modules/todos";
import { setTodos } from "../../redux/modules/todos";

function List() {
  const todos = useSelector((state) => {
    return state.todos;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTodos(todos));
  }, [dispatch, todos]);

  const navigateClick = (todoId) => {
    navigate(`/${todoId}`);
  };

  const compare = (a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return bDate - aDate;
  };

  return (
    <div>
      <div>
        {todos.sort(compare).map((todo) => {
          return (
            <div
              key={todo.id}
              style={{
                border: "1px solid black",
                padding: "10px",
                margin: "10px",
              }}
              onClick={() => navigateClick(todo.id)}
            >
              <p>{todo.createdAt ? todo.createdAt : "날짜 정보 없음"}</p>
              <p>카테고리 : {todo.category}</p>
              <p> 제목:{todo.title}</p>
              <p> 내용:{todo.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
