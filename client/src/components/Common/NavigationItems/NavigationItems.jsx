import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {

    return (
        // <div></div>
        <ul className={props.className}>{
            props.menu.map((menuItem) => {
                const size = menuItem.size;
                const clicked = menuItem.clicked;

                return <NavigationItem
                    key={menuItem.link}
                    className={menuItem.class}
                    link={menuItem.link}
                    text={menuItem.text}
                    {...(menuItem.text === 'cart' ? { text: <i className="fas fa-shopping-cart"><span className="cart-size">{size}</span></i> } : { text: menuItem.text })}
                    {...(menuItem.text === 'cart' ? { size: size } : {})}
                    {...(menuItem.text === 'Logout' ? { clicked: clicked } : {})}
                >
                    {menuItem.text}
                </NavigationItem>
            })
        }
        </ul>
    )
}

export default NavigationItems;