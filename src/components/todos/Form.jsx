import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/modules/todos";
import uuid from "react-uuid";

function Form() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !body) {
      alert("필수값이 누락되었습니다. 확인해주세요.");
      return;
    }

    try {
      const data = {
        id: uuid(),
        category: category,
        title: title,
        body: body,
        isDone: false,
        createdAt: new Date().toString(),
      };
      await addDoc(collection(db, "todos"), data);
      dispatch(addTodo(data));
      // 입력 필드 초기화
      setCategory("");
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("데이터 추가 에러:", error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">select category</option>
            <option value="문화">문화</option>
            <option value="전시">전시</option>
            <option value="공연">공연</option>
            <option value="연극">연극</option>
            <option value="뮤지컬">뮤지컬</option>
          </select>
          <label>제목</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <label>내용</label>
          <input
            type="text"
            name="body"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></input>
        </div>
        <button type="submit">추가하기</button>
      </form>
    </div>
  );
}

export default Form;
