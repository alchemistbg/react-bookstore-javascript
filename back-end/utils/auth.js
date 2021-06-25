const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.cookies['x-auth-token'] || '';

    jwt.verify(token, process.env.JWT_SECRET, (error, decodedUser) => {
        if (error) {
            // console.log(error.message);
            error.message = 'Unauthenticated'
            error.status = 401;
            next(error);
        }

        req.user = { ...decodedUser };
        req.token = token;
        next();
    });
}