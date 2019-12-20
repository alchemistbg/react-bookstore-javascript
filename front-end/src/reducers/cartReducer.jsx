export const initialCartState = { cart: [] };

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                cart: state.cart.concat(action.item)
            }
        case 'REMOVE_FROM_CART':
            return {
                cart: state.cart.filter(item => item.id !== action.id)
            }
        default:
            return state
    }
};

