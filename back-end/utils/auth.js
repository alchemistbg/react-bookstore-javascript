const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split('Bearer ')[1];
    } else {
        return res.status(403).json({
            error: "Unauthorized"
        });

    }

    jwt.verify(token, 'verysecretstring', (error, decoded) => {
        if (error) {
            error.status = 403;
            // return res.status(403).json({
            //     error: "Invalid credentials"
            // });
            next(error);
            // return next(error);
        }

        req.user = decoded;
        console.log(req.user)
        next();
        // return next();
    });

}