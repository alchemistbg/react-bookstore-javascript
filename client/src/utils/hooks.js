import React, { useLayoutEffect, useState } from 'react'

// Custom hooks that listen for window resizing
// Code taken from https://stackoverflow.com/a/19014495/520328
export const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}
