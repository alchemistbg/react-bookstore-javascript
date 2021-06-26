const { logoutUser } = require('../requests/userRequests');

export const initialUserState = {
    isLoggedIn: false,
    userName: '',
    userId: '',
    error: ''
};

export const userReducer = (state, action) => {
    switch (action.type) {
        case "CHECK_IF_LOGGED":
            // console.log(action.type);
            return {
                isLoggedIn: true,
                userName: action.payload.userName,
                userId: action.payload.userId,
                error: ''
            };

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
            return logoutUser()
                .then((res) => {
                    // console.log(res);
                })
                .catch((error) => {
                    console.error(error);
                });

        default:
            return state;
    }
};
