const {createStore, applyMiddleware} = require('redux')
const loggerMiddleware = require('redux-logger').createLogger()
//initialState

const initialState = {
    posts:[],
}

const fetchPostRequest = ()=>{
    return{
        type: "REQUEST_STARTED",
    };
}

const fetchPostSuccess = ()=>{
    return{
        type: "FETCH_SUCCESS",
    };
}

const fetchPostFaliure = ()=>{
    return{
        type: "FETCH_FAILED",
    };
}

const postsReducer=(state=initialState,action)=>{
    switch(action.type){
        case "REQUEST_STARTED":
            return{
                posts: ["HTML"],
            }; 
    }
}

const store = createStore(postsReducer,applyMiddleware(loggerMiddleware))

store.subscribe(()=>{
    const data = store.getState();
    console.log(data)
});

store.dispatch(fetchPostRequest());