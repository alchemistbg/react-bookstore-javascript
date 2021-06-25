import { postCart, deleteCart } from './../requests/cartRequests';

export const initialCartState = {
    cart: []
};

export const cartReducer = (state, action) => {
    console.log(action.type);

    let itemIndex;
    if (action.item) {
        itemIndex = state.cart.findIndex(item => item._id === action.item._id) || 0;
    }

    const clearCart = () => {
        localStorage.removeItem("cart");
    }

    const getCart = (userId) => {

    }

    const saveCart = (cartData, userId) => {
        // localStorage.setItem("cart", JSON.stringify(data));
        // console.log(cartData);
        // console.log(userId);
        postCart(userId, cartData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    switch (action.type) {
        case 'LOAD_CART_FROM_DATABASE':
            console.log(action.payload);
            state.cart = [...action.payload.selectedBooks];
            saveCart(state.cart);
            return {
                cart: state.cart
            };

        case 'ADD_TO_CART':
            if (itemIndex > -1) {
                state.cart[itemIndex].qty = +state.cart[itemIndex].qty + +action.item.qty;
                state.cart[itemIndex].totalPrice = +(+state.cart[itemIndex].qty * +state.cart[itemIndex].price).toFixed(2);
                saveCart(state.cart);
                return {
                    cart: state.cart
                }
            }

            const book = { ...action.item }
            book.totalPrice = +(+book.qty * +book.price).toFixed(2);
            // action.item.totalPrice = +(+action.item.qty * +action.item.price).toFixed(2);
            // console.log("1st time: ", book);
            state.cart.push(book);
            saveCart(state.cart, action.userId);
            return {
                cart: state.cart
            }

        case 'INCREMENT':
            state.cart[itemIndex].qty += 1
            state.cart[itemIndex].totalPrice = +(+state.cart[itemIndex].qty * +state.cart[itemIndex].price).toFixed(2);
            saveCart(state.cart);
            return {
                cart: state.cart
            }

        case 'DECREMENT':
            if (state.cart[itemIndex].qty > 1) {
                state.cart[itemIndex].qty -= 1;
                state.cart[itemIndex].totalPrice = +(+state.cart[itemIndex].qty * +state.cart[itemIndex].price).toFixed(2);
            }
            saveCart(state.cart);
            return {
                cart: state.cart
            }

        case 'REMOVE_FROM_CART':
            state.cart = state.cart.filter((book) => {
                return (book._id !== action.item._id);
            });

            if (state.cart.length > 0) {
                saveCart(state.cart);
            } else {
                // clearCart();
                deleteCart(action.userId)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            return {
                cart: state.cart
            }

        case 'CHECKOUT':
            clearCart();
            return { cart: [] };

        default:
            return state;
    }
}
