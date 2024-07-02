const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;
const axios = require("axios");

// Action Types
const REQUEST_STARTED = "REQUEST_STARTED";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAILED = "FETCH_FAILED";

// Initial State
const initialState = {
  posts: [],
  error: "",
  loading: false,
};

// Action Creators
const fetchPostRequest = () => ({
  type: REQUEST_STARTED,
});

const fetchPostSuccess = (posts) => ({
  type: FETCH_SUCCESS,
  payload: posts,
});

const fetchPostFailed = (error) => ({
  type: FETCH_FAILED,
  payload: error,
});

// Async Action Creator (Thunk)
const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostRequest());
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      dispatch(fetchPostSuccess(response.data));
    } catch (error) {
      dispatch(fetchPostFailed(error.message));
    }
  };
};

// Reducer
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case FETCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Create Store
const store = createStore(postsReducer, applyMiddleware(thunk));

// Subscribe to Store
store.subscribe(() => {
  const data = store.getState();
  console.log(data);
});

// Dispatch Action
store.dispatch(fetchPosts());
