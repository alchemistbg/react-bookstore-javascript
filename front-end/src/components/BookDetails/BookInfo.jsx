import React from 'react'

function handleAddToCartClick() {
    console.log('clicked')
}

function BookInfo(props) {
    const { book } = props;
    return (
        <div className="book-info">
            <h4>{book.title}</h4>
            <div>from {book.author}</div>
            <div>published by {book.publisher}</div>
            <div>Categories: {
                book.genres.map((genre, index) => {
                    if (index < book.genres.length - 1) {
                        return <span key={genre._id}>{genre.name}, </span>;
                    }
                    return <span key={genre._id}>{genre.name}</span>;
                })
            }</div>
            <div>ISBN: {book.isbn}</div>
            <div>Price: {book.price}</div>
            <input className="form-button" type="button" value="Add to cart" onClick={handleAddToCartClick} />
        </div>
    );
}



export default BookInfo;