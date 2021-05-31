const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.cookies)

    const token = req.cookies['x-auth-token'] || '';
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    //     token = req.headers.authorization.split('Bearer ')[1];
    // } else {
    //     return res.status(401).json({
    //         error: "Unauthenticated"
    //     });

    // }

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