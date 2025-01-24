import { Type } from "./action.type";

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: 
      // Check if the item already exists in the basket
      const existingItem = state.basket.find(
       ( item)   => item.id === action.item.id
      );
      if (!existingItem) {
        // If not, add the new item with an initial amount of 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        }
      } else {
        // If it exists, update the amount of the item
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.item.id
              ? { ...item, amount: item.amount + 1 }
              : item
          ),
        };
      
    }

    case Type.REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        // If the item exists and its amount is greater than 1, decrease the amount
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          // If the amount is 1, remove the item from the basket
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket,
      };
    }

    case Type.EMPTY_BASKET:
      // Clear the basket
      return {
        ...state,
        basket: [],
      };

    case Type.SET_USER:
      // Set the user in the state
      return {
        ...state,
        user: action.user,
      };

    default:
      // Return the current state if action type is unrecognized
      return state;
  }
};
