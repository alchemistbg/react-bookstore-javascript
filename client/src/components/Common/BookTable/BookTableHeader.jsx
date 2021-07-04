import React, { Fragment } from 'react'

const BookTableHeader = (props) => {
    return <Fragment>
        <li className={`book-list-item header ${props.source}`}>
            <span className="book-list-item-title">
                Book Title
            </span>
            <span className="book-list-item-sprice">
                Unit price
            </span>
            <span className="book-list-item-qty">
                Quantity
            </span>
            <span className="book-list-item-tprice">
                Total price
            </span>
            {
                props.source === "cart" ? (
                    <span className="book-list-item-delete">
                        {/* Total price */}
                    </span>
                ) : (null)
            }
        </li>
    </Fragment>
}

export default BookTableHeader;