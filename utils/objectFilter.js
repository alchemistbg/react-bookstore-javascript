module.exports = (array, props) => {
    return array.map((item) => {
        return props.reduce((acc, curr) => {
            if (item.hasOwnProperty(curr)) {
                acc[curr] = item[curr];
            }
            return acc;
        }, {});
    });
}