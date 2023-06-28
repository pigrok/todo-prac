// store을 만듬
// 중앙데이터 관리소 역할
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todos from "../modules/todos";
import comments from "../modules/comments";
import thunk from "redux-thunk";

// Redux Persist 구성
const persistConfig = {
  key: "root",
  storage,
};

// 객체 형태로 key-value형태로 들어감
const rootReducer = combineReducers({
  todos: todos,
  comments: comments,
});

// Persisted Reducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux Store 생성
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export { store, persistor };

// // store을 만듬
// // 중앙데이터 관리소 역할
// import { createStore, applyMiddleware } from "redux";
// import { combineReducers } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import todos from "../modules/todos";
// import comments from "../modules/comments";
// import thunk from "redux-thunk";

// // Redux Persist 구성
// const persistConfig = {
//   key: "root",
//   storage,
// };

// // 객체 형태로 key-value형태로 들어감
// const rootReducer = combineReducers({
//   todos: todos,
//   comments: comments,
// });

// // Persisted Reducer 생성
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Redux Store 생성
// const store = createStore(persistedReducer, applyMiddleware(thunk));
// const persistor = persistStore(store);
// export { store, persistor };
