import React from 'react';

const Quantity = (props) => {

    // console.log(props.book.qty);
    return <span className="book-list-item-qty">
        {
            props.book.qty < 2 ? (
                <button className="form-button book-table" disabled>
                    <i className="far fa-minus-square"></i>
                </button>
            ) : (
                <button className="form-button book-table" onClick={() => props.handleDecrement(props.book)}>
                    <i className="far fa-minus-square"></i>
                </button>
            )
        }
        {props.book.qty}
        <button className="form-button book-table" onClick={() => props.handleIncrement(props.book)}>
            <i className="far fa-plus-square"></i>
        </button>
    </span>
}

export default Quantity;