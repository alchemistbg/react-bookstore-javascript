import React from 'react';

const SortContext = React.createContext();

export const SortProvider = SortContext.Provider;
export const SortConsumer = SortContext.Consumer;

export default SortContext;