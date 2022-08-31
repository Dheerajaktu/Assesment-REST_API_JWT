const jwt = require('jsonwebtoken');

module.exports.getBearerToken = async (req, res) => {
    try {
        const accessToken = jwt.sign('todo', process.env.SECRET_KEY);
        res.status(200).json({ 'Bearer Token': `${accessToken}` });
    } catch (e) {
        res.status(500).json({ 'Bearer Token Error': `${e}` });
    }

}



