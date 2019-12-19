import React from 'react'

const AuthContext = React.createContext({});

export const Provider = AuthContext.Provider;
export const Consumer = AuthContext.Consumer;

export default AuthContext;