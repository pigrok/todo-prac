// 초기배열
const initialState = [];

// 리듀서
// action => type, payload
const comments = (state = initialState, action) => {
  // 액션을 지정
  switch (action.type) {
    case "ADD_COMMENT":
      return [...state, action.payload];

    case "DELETE_COMMENT":
      return state.filter((comment) => comment.id !== action.payload);

    default:
      return state;
  }
};

export default comments;
