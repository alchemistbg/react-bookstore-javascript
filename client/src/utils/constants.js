let BASE_URL = undefined;

if (process.env.NODE_ENV === "development") {
    console.log(process.env.NODE_ENV)
    BASE_URL = 'http://localhost:5001/api';
} else if (process.env.NODE_ENV === "production") {
    BASE_URL = `https://mern-bookstore.herokuapp.com/api`;
}

export {
    BASE_URL
};