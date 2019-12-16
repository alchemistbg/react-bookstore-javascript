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
                <BookFromCategory category="upcoming" />
                <BookFromCategory category="newest" />
                <BookFromCategory category="bestselling" />
            </div>
        );
    }
}

export default Home;