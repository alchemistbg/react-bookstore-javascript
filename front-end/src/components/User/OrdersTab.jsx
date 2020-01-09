import React, { Fragment } from 'react';

import { timeFormat } from '../../utils/helpers';

const OrdersTab = (props) => {
    const { orders } = props;

    return <Fragment>

        <input className="input" type="radio" name="tabs" id="tab-2" />

        <div className="ilabel">
            <label className="label" htmlFor="tab-2">Blah</label>
            <div className="triangle"></div>
        </div>

        <div className="panel">

            <h4 className="header">Orders info</h4>
            <div className="orders-info">
                {
                    orders.length === 0 ? (
                        <h6>You haven't made any orders yet!</h6>
                    ) : (
                            <table className="orders-list">
                                <thead>
                                    <tr>
                                        <td>Order date</td>
                                        <td>Order size</td>
                                        <td>Order price</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order) => {
                                            return <tr key={order._id} className="order-item">
                                                <td className="order-date">
                                                    {timeFormat(order.orderDate)}
                                                </td>
                                                <td className="order-size">
                                                    {order.orderedBooks.length}
                                                </td>
                                                <td className="order-price">
                                                    {order.totalPrice}
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                }
            </div>

        </div>
    </Fragment>
}

export default OrdersTab;