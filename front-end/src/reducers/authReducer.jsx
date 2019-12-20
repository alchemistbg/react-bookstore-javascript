export const initialAuthState = {
    isLoggedIn: false,
    userName: '',
    userId: '',
    error: ''
};

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isLoggedIn: true,
                userName: action.payload.userName,
                userId: action.payload.userId,
                error: ''
            };
        case 'LOGIN_ERROR':
            return {
                isLoggedIn: false,
                userName: '',
                userId: '',
                error: action.payload.error
            };
        case 'LOGOUT':
            return {
                isLoggedIn: false,
                userName: '',
                userId: '',
                error: ''
            };
        default:
            return state;
    }
};
