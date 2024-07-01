const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;
const axios = require("axios");
//custom Middleware

// const logger = () => {
//   return (next) => {
//     return (action) => {
//       console.log("action fired", action);
//       next(action);
//     };
//   };
// };
//initialState

const initialState = {
  posts: [],
  error: "",
  loading: false,
};

const FETCH_SUCCESS = "FETCH_SUCCESS";
const REQUEST_STARTED = "REQUEST_STARTED";
const FETCH_FAILED = "FETCH_FAILED";

const fetchPostRequest = () => {
  return {
    type: REQUEST_STARTED,
  };
};

const fetchPostSuccess = (posts) => {
  return {
    type: FETCH_SUCCESS,
    payload: posts,
  };
};

const fetchPostFaliure = (err) => {
  return {
    type: FETCH_FAILED,
    payload: err,
  };
};

const fetchPosts = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchPostRequest());
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch(fetchPostSuccess(data));
    } catch (error) {
      dispatch(fetchPostFaliure(error.message));
    }
  };
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        loading: true,
      };
  }
};

const store = createStore(postsReducer, applyMiddleware(thunk));

store.subscribe(() => {
  const data = store.getState();
  console.log(data);
});

store.dispatch(fetchPosts());
