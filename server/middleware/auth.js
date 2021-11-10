const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @detail Used for essential requests about sensitive operations 
 */
exports.strictAuth = (req, res, next) => {
    const token = req.header('x-auth-token');

    // check for token
    if (!token)
        return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        // verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        // add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};
/**
 * @detail  Used for comparing the viewer's identity and the target user's identity
 *          e.g., logged user (or guest user) views another user's profile
 */
exports.softAuth = (req, res, next) => {
    const token = req.header('x-auth-token');

    try {
        // check for token
        if (!token)
            throw Error('No token');

        // verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        // add user from payload (logged user)
        req.user = decoded;
        next();
    } catch (e) {
        // simply run next for guest user
        next();
    }
};
