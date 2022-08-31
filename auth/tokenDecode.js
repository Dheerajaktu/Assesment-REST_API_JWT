const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedInfo = jwt.verify(token, process.env.SECRET_KEY);
        req.auth = decodedInfo;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Invalid Token', error: e });
    }

}