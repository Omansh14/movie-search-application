import initialState from "./initialState";

const wishListReducer = (currentState, action) => {
    const state = currentState || initialState?.wishList;

    switch (action.type) {
        
        default: return state;
    }
}

export default wishListReducer;
