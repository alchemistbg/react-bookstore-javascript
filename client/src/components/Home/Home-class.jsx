import React, { Component } from 'react';

import BookFromCategory from './BookFromCategory';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageName: 'Reactive Bookstore | Home'
        }
    }
    render() {
        return (
            document.title = this.state.pageName,
            <div className="home-page">
                <h2>Home</h2>

                <h5>{process.env.NODE_ENV}</h5>
                <h5>{process.env.REACT_APP_API_URL}</h5>
                <BookFromCategory category="upcoming" />
                <BookFromCategory category="newest" />
                <BookFromCategory category="bestselling" />
            </div>
        );
    }
}

export default Home;