import React from 'react';
import BookFromCategory from './BookFromCategory';

const Home = (props) => {

    return (
        document.title = "Reactive Bookstore | Home",
        <div className="home-page">
            <h2>Home</h2>
            {
                process.env.NODE_ENV === "development" ? (
                    <div>
                        <h5>{process.env.NODE_ENV}</h5>
                        <h5>{process.env.REACT_APP_API_URL}</h5>
                    </div>
                ) : (null)
            }
            <BookFromCategory category="upcoming" />
            <BookFromCategory category="newest" />
            <BookFromCategory category="bestselling" />
        </div>
    )
}

export default Home;