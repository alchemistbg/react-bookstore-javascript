export const initialCartState = {
    cart: []
};

export const cartReducer = (state, action) => {
    let itemIndex;
    if (action.item) {
        itemIndex = state.cart.findIndex(item => item._id === action.item._id) || 0;
    }
    switch (action.type) {
        case 'ADD_TO_CART':
            if (itemIndex > -1) {
                state.cart[itemIndex].qty += 1;
                state.cart[itemIndex].totalPrice = (state.cart[itemIndex].qty * state.cart[itemIndex].price).toFixed(2);
                return {
                    cart: state.cart
                }
            } else {
                action.item.qty = 1;
                action.item.totalPrice = action.item.price.toFixed(2);
                return {
                    cart: state.cart.concat(action.item)
                }
            }

        case 'INCREMENT':
            state.cart[itemIndex].qty += 1
            state.cart[itemIndex].totalPrice = (state.cart[itemIndex].qty * state.cart[itemIndex].price).toFixed(2);
            return {
                cart: state.cart
            }

        case 'DECREMENT':
            if (state.cart[itemIndex].qty > 1) {
                state.cart[itemIndex].qty -= 1;
                state.cart[itemIndex].totalPrice = (state.cart[itemIndex].qty * state.cart[itemIndex].price).toFixed(2);
            }
            return {
                cart: state.cart
            }

        case 'REMOVE_FROM_CART':
            return {
                cart: state.cart.filter((item) => item._id !== action.item._id)
            }

        case 'CHECKOUT':
            return { cart: [] };

        default:
            return state;
    }
}
