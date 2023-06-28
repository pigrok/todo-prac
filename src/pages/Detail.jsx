import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";
import { deleteTodoAsync, fetchTodos, setTodos, updateTodoAsync } from "../redux/modules/todos";

function Detail() {
  // Redux store에서 state를 가져오기 위해 useState를 사용
  const todos = useSelector((state) => state.todos);
  const comments = useSelector((state) => state.comments);

  // useState를 사용하여 로컬 상태 변수를 정의
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");

  // useParams를 사용하여 URL에서 파라미터 값을 가져옴
  const { id } = useParams();

  // 가져온 파라미터 id와 일치하는 todo를 찾음
  const todo = todos.find((todo) => todo.id === id);

  // useNavigate를 사용하여 페이지 이동
  const navigate = useNavigate();
  // useDispatch를 사용하여 action을 디스패치
  const dispatch = useDispatch();

  // 컴포넌트가 마운트될 때(DOM에 추가되어 화면에 나타나는 것)
  // fetchTodos 액션을 디스패치하여 데이터를 가져옴
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // todos 배열이 업데이트될 때마다 setTodos 액션을 디스패치하여 상태를 업데이트
  useEffect(() => {
    dispatch(setTodos(todos));
  }, [dispatch, todos]);

  const deleteTodo = () => {
    dispatch(deleteTodoAsync(todo.id));
    dispatch(fetchTodos());
    navigate("/");
  };

  const updateTodo = async () => {
    const updatedTodo = { ...todo, title: title, body: body };
    await dispatch(updateTodoAsync(updatedTodo));
    dispatch(fetchTodos());
    setEdit(false);
  };

  const sortCommentsDate = (comments) => {
    return comments.slice().sort((a, b) => b.updatedAt - a.updatedAt);
  };

  // const formatDate = (date) => {
  //   return new Date(date).toLocaleString("ko-KR", {
  //     dateStyle: "long",
  //     timeStyle: "medium",
  //   });
  //   // .toString();
  // };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD_COMMENT",
      payload: {
        id: shortid.generate(),
        writer: name,
        contents: contents,
        todoId: todo.id,
        updatedAt: new Date().toString(),
      },
    });
  };

  const handleCommentDelete = (commentId) => {
    dispatch({
      type: "DELETE_COMMENT",
      payload: commentId,
    });
  };

  return (
    <div>
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
            <p>작성일자: {todo.createdAt ? todo.createdAt : "날짜 정보 없음"}</p>
          </div>
          <div style={{ marginRight: "550px" }}>
            {edit ? (
              <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={updateTodo}>
                저장
              </button>
            ) : (
              <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={() => setEdit(true)}>
                수정
              </button>
            )}
            <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={deleteTodo}>
              삭제
            </button>
            <button style={{ width: "100px", height: "50px", margin: "15px" }} onClick={() => navigate("/")}>
              이전 화면으로
            </button>
          </div>
        </div>
      </div>
      <div style={{ padding: "10px", margin: "10px", width: "1000px", height: "500px" }}>
        <div style={{ border: "1px solid black", textAlign: "center" }}>
          <p>title: {todo.title}</p>
          {edit && <input value={title} onChange={(e) => setTitle(e.target.value)} />}
        </div>
        <div style={{ border: "1px solid black", marginTop: "20px", height: "400px" }}>
          <p>body: {todo.body}</p>
          {edit && <textarea value={body} onChange={(e) => setBody(e.target.value)} />}
        </div>
      </div>
      <div>
        <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
          <form onSubmit={handleCommentSubmit}>
            <h3>댓글</h3>
            <input
              name="이름"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <input
              name="댓글"
              value={contents}
              onChange={(e) => {
                setContents(e.target.value);
              }}
            />
            <button>작성</button>
          </form>
        </div>
        <div>
          {sortCommentsDate(comments).map((comment) => (
            <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }} key={comment?.id}>
              <p>name: {comment.writer}</p>
              <p>content: {comment.contents}</p>
              <p>작성일자: {comment.updatedAt}</p>
              <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Detail;
