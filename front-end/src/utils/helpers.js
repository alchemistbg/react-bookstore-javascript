function timeFormat(commentTime) {
    const time = new Date(commentTime).toDateString();
    const timeArr = time.split(' ');
    const date = timeArr[2];
    const month = timeArr[1];
    const year = timeArr[3];
    // console.log(`${date} ${month} ${year}`);
    return `${date} ${month} ${year}`;
}

export {
    timeFormat
}