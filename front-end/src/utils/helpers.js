import toastr from 'toastr';

const toastOptions = {
    closeButton: true,
    newestOnTop: false,
    timeOut: 1000,
    // extendedTimeOut: 1000,
    progressBar: true,
    // timeOut: 0,
    // extendedTimeOut: 0
}

function showToast(toastType, toastData) {
    toastr.remove();

    if (toastType === 'success') {
        toastr[toastType](toastData.message, toastData.title, toastOptions);
        return;
    }

    if (toastType === 'simpleError') {
        toastr['error'](toastData.message, toastData.title, toastOptions);
        return;
    }

    Object.keys(toastData).forEach((key) => {
        if (toastData[key].length > 0) {
            toastr[toastType](toastData[key].join('\n'), `Invalid ${key}`, toastOptions);
        }
    });
}

// function totalPriceFormat(price, qty) {

// }

function timeFormat(commentTime) {
    const time = new Date(commentTime).toDateString();
    const timeArr = time.split(' ');
    const date = timeArr[2];
    const month = timeArr[1];
    const year = timeArr[3];
    return `${date} ${month} ${year}`;
}

function calcCartTotalSum(cart) {
    let cartTotalPrice = 0;
    cart.map((cartItem) => {
        cartTotalPrice += +cartItem.totalPrice;
    });
    return cartTotalPrice;
}

export {
    showToast,
    timeFormat,
    calcCartTotalSum
}