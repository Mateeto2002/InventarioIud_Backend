const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' });
    }

    // Split the authHeader to extract the token
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("JWT Verification Error:", err); // Debug: Print out any JWT error
            return res.status(401).send({ error: 'Failed to authenticate token' });
        }

        req.userId = decoded.userId;
        next();
    });
};

module.exports = authenticate;
