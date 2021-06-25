const bookPropFilter = (array, props) => {
    // console.log("bookPropFilter: ", array);
    return array.map((item) => {
        return props.reduce((acc, curr) => {
            if (item.hasOwnProperty(curr)) {
                acc[curr] = item[curr];
            }
            return acc;
        }, {});
    });
}

const cartPriceCalculator = (books) => {
    console.log("cartPriceCalculator")
    return books.reduce((acc, curr, idx) => {
        return acc += books[idx].totalPrice;
    }, 0);

    // return cartTotalPrice;
}

module.exports = {
    bookPropFilter,
    cartPriceCalculator
}