import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";

const ADD_TODO = "todos/ADD_TODO";
const DELETE_TODO = "todos/DELETE_TODO";
const UPDATE_TODO = "todos/UPDATE_TODO";
const SET_TODOS = "todos/SET_TODOS";

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const updateTodo = (id) => ({
  type: UPDATE_TODO,
  payload: id,
});

export const setTodos = (todos) => ({
  type: SET_TODOS,
  payload: todos,
});

const initialState = [];

export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));

      const todos = await querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt;
        return { id: doc.id, ...data, createdAt };
      });
      dispatch(setTodos(todos));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTodoAsync = (id) => {
  return async (dispatch) => {
    try {
      // 해당 uuid 값을 가진 문서를 조회하는 쿼리
      const q = await query(collection(db, "todos"), where("id", "==", id));
      const querySnapshot = await getDocs(q);

      // 문서를 찾았을 경우 삭제 처리
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
        dispatch(deleteTodo(id));
      } else {
        console.log("해당 id를 가진 문서를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateTodoAsync = (todo) => {
  return async (dispatch) => {
    try {
      const q = await query(collection(db, "todos"), where("id", "==", todo.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { ...todo });
        dispatch(updateTodo({ id: todo.id, ...todo }));
        dispatch(fetchTodos());
      } else {
        console.log("해당 id를 가진 문서를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
// 리듀서 함수
const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      let temp = [...state];
      temp.push(action.payload);
      return temp;
    }

    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);

    case UPDATE_TODO:
      return state.map((todo) => (todo.id === action.payload.id ? action.payload : todo));

    case SET_TODOS:
      return action.payload;

    default:
      return state;
  }
};

export default todos;
