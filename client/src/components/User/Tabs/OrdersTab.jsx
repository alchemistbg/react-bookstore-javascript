import React, { Fragment } from 'react';

import BookTable from './../../Common/BookTable/BookTable';

import { timeFormat } from './../../../utils/helpers';

const OrdersTab = (props) => {
    const { orders } = props;
    // console.log("Orders: ", orders);

    return <Fragment>
        <input className="input" type="radio" name="tabs" id="tab-2" />
        <div className="ilabel">
            <label className="label" htmlFor="tab-2">Orders</label>
            <div className="triangle"></div>
        </div>

        <div className="panel">

            <h4 className="header">Orders information</h4>
            <div className="orders-info">
                {
                    orders.length === 0 ? (
                        <h6>You haven't made any orders yet!</h6>
                    ) : (
                        <ul className="orders-list">{
                            orders.map((order, index) => {
                                return <li key={order._id} className="orders-list-item">
                                    <input className="orders-list-item-cb" type="checkbox" name="" id={"cb-" + index} />
                                    <div className="orders-list-item-info">
                                        <label htmlFor={"cb-" + index} className="orders-list-item-label">
                                            <span className="order-date">{timeFormat(order.orderDate)}</span>
                                            <span className="order-size">{order.orderedBooks.length}</span>
                                            <span className="order-sum">{order.orderTotalPrice.toFixed(2) || "NaN"}</span>
                                        </label>
                                        <span className="orders-list-item-data">
                                            <BookTable source="ordersTab" bookTable={order.orderedBooks} />
                                        </span>
                                    </div>
                                </li>
                            })
                        }
                        </ul>
                    )
                }
            </div>

        </div>
    </Fragment>
}

export default OrdersTab;