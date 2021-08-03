import toastr from 'toastr';

const toastOptions = {
    closeButton: true,
    newestOnTop: false,
    timeOut: 1000,
    // extendedTimeOut: 1000,
    // timeOut: 0,
    // extendedTimeOut: 0
    progressBar: true,
}

function showToast(toastType, toastData) {
    toastr.remove();

    if (toastType === 'success') {
        console.log(toastData)
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

function timeFormat(commentTime) {
    const dateStr = new Date(commentTime).toDateString();
    const dateArr = dateStr.split(' ');
    const date = dateArr[2];
    const month = dateArr[1];
    const year = dateArr[3];

    const fullDate = `${date} ${month} ${year}`;

    const timeStr = new Date(commentTime).toTimeString();
    const timeArr = timeStr.split(':');
    const hour = timeArr[0];
    const min = timeArr[1];
    const sec = timeArr[2].split(' ')[0];
    const fullTime = `${hour}:${min}:${sec}`;
    return [fullDate, fullTime];
}

function calcCartTotalSum(cart) {
    let cartTotalPrice = 0;
    cart.map((cartItem) => {
        cartTotalPrice += +cartItem.totalPrice;
        return cartTotalPrice;
    });
    return cartTotalPrice;
}

export {
    showToast,
    timeFormat,
    calcCartTotalSum
}