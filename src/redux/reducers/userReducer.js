import initialState from "./initialState";

const userReducer = (currentState, action) => {
    const state = currentState || initialState?.user;

    switch (action.type) {

        case 'ADD_AUTH_INFO':
        return {
            ...state,
            auth: action.payload || {},
        }
        
        default: return state;
    }
}

export default userReducer;