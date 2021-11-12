const jwt = require("jsonwebtoken");
const Platform = require("../models/Platform");
const Quiz = require("../models/Quiz");
const UserProfile = require("../models/UserProfile");
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

const GUEST_VIEW = 'GUEST_VIEW';
const OWNER_VIEW = 'OWNER_VIEW';
const ADMIN_VIEW = 'ADMIN_VIEW';

exports.GUEST_VIEW = GUEST_VIEW;
exports.OWNER_VIEW = OWNER_VIEW;
exports.ADMIN_VIEW = ADMIN_VIEW;

/**
 * @detail  Used for comparing the viewer's identity and the target user's identity
 *          e.g., logged user (or guest user) views another user's profile
 */
exports.softAuth = async (req, res, next) => {
    const token = req.header('x-auth-token');

    try {
        // check for token
        if (!token) {
            req.viewType = GUEST_VIEW;
            throw Error('No token');
        }
        // verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        // add user from payload (logged user)
        req.user = decoded;
        // profile
        if (req.params.profileId) {
            // matched profileId: viewer is getting own profile
            if (req.user.profile === req.params.profileId) {
                req.viewType = OWNER_VIEW;
            }
        }
        // platform
        else if (req.params.platformId) {
            // get Profile id for current viewer
            const platform = await Platform.findById(req.params.platformId).select(['owner', 'admins']);

            const ownerId = platform.owner.toString();
            const adminsId = platform.admins.map(id => id.toString());

            

            // matched profileId: viewer is getting own profile
            if (ownerId === req.user.profile) {
                req.viewType = OWNER_VIEW;
            } else if (adminsId.includes(req.user.profile)) {
                req.viewType = ADMIN_VIEW;
            }
        }
        // quiz
        else if (req.params.quizId) {
            // get Profile id for current viewer
            const quiz = await Quiz.findById(req.params.quizId).select('owner');
            const ownerId = quiz.owner.toString();
            console.log("Query: ", quiz);
            console.log("ownerId: ", ownerId);
            // matched profileId: viewer is getting own profile
            if (ownerId === req.user.id) {
                req.viewType = this.OWNER_VIEW;
            }
        }
        // viewer is not owner
        else {
            req.viewType = GUEST_VIEW;
        }
        // console.log("before next, viewTYpe:", req.viewType);
        // run next handler
        next();
    } catch (e) {
        // either no token or token invalid
        req.user = null;
        // simply run next for guest user
        next();
    }
};
