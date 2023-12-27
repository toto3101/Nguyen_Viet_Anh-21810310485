import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        // Add the item to the cart
        return [...state, action.item];
      case 'REMOVE_FROM_CART':
        // Remove the item from the cart
        return state.filter((item) => item.product_id !== action.itemId);
      case 'UPDATE_CART':
        // Update the cart with the new array of items
        return action.updatedCart;
      case 'CLEAR':
        return [];
      case 'FAVOURITE':
        return { ...state, favorites: [...state.favorites, action.item] };
      default:
        return state;
    }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
