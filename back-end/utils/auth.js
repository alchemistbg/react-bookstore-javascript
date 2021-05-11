const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split('Bearer ')[1];
    } else {
        return res.status(401).json({
            error: "Unauthenticated"
        });

    }

    jwt.verify(token, 'verysecretstring', (error, decoded) => {
        if (error) {
            error.status = 403;
            next(error);
        }

        req.user = decoded;
        next();
    });

}