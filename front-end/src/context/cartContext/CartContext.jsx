import React from 'react'

const CartContext = React.createContext({});

export const Provider = CartContext.Provider;
export const Consumer = CartContext.Consumer;

export default CartContext;