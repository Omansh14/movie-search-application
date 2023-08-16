import initialState from "./initialState";

const appReducer = (currentState, action) => {
    const state = currentState || initialState?.app;

    switch (action.type) {

        case 'REQUEST_MOVIE_DATA': 
        return {
            ...state,
            loadingState: 'LOADING',
        }

        case 'RECEIVE_MOVIE_DATA': 
        return {
            ...state,
            loadingState: 'LOADED',
            movieList: action.payload || [],
        }

        case 'ERROR_MOVIE_DATA': 
        return {
            ...state,
            loadingState: 'ERROR',
            error: action.payload,
        }
        
        default: return state;
    }
}

export default appReducer;