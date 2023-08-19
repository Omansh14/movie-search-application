import initialState from "./initialState";

const wishListReducer = (currentState, action) => {
  const state = currentState || initialState?.wishList;

  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishItems: action.payload,
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishItems: action.payload,
      };

    default:
      return state;
  }
};

export default wishListReducer;
