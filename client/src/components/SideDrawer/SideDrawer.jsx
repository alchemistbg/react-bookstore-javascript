// import './SideDrawer.scss';
import { Link } from 'react-router-dom';

import React, { Fragment } from 'react'

import Logo from './../Logo/Logo';
import BackDrop from './BackDrop/BackDrop';
import NavigationItems from './../Common/NavigationItems/NavigationItems';

const SideDrawer = (props) => {
    const { toggle, close, menu } = props;
    let classes = ['SideDrawer'];
    if (toggle) {
        classes.push('Open');
    } else {
        classes.push('Close');
    }

    return <Fragment>
        <BackDrop onToggle={toggle} onClose={close} />
        <div className={classes.join(' ')} onClick={close}>
            <div className="logo-row">
                <Logo className={'mobile'} />
                <Link to="/" className="link-logo">
                    <p className="logo">
                        <span className="reactive">Reactive</span> Bookstore
                    </p>
                </Link>
                <button><i className="far fa-window-close"></i></button>
            </div>
            <NavigationItems className={'major-nav-list mobile'} menu={menu} />
        </div>
    </Fragment>
}

export default SideDrawer
