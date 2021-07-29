import './BackDrop.scss';

import React from 'react'

const BackDrop = (props) => {
    const { onToggle, onClose } = { ...props };

    return onToggle ?
        (<div className='BackDrop' onClick={onClose}>
            {/* BackDrop */}
        </div>) :
        (null)
}


export default BackDrop
