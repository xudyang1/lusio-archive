const Badge = require("../models/Badge");
const { errorHandler, nonNullJson } = require("../utils/jsonTool");

/**
 * TODO: need to modify
 * @desc  Create a new badge
 * @route POST api/achievement/badges
 * @access  Private
 * @detail  only system admins can do this
 * @format  req.body: { 
 *                          badge: {
 *                              title: String,
 *                              description: String,
 *                              imageURI: String,
 *                              requirement: [{target_field: String, value: Number}]
 *                          }
 *                    }
 *          res.data: { 
 *              success: true,
 *              badge: { _id, title, description, imageURI, requirement} (added badge)
 *          }
 */
exports.addBadge = async (req, res, next) => {
    try {
        const { title, description, imageURI, requirement } = req.body.badge;
        const newBadge = new Badge({
            title,
            description,
            imageURI,
            requirement
        });
        const savedBadge = await newBadge.save();
        if (!savedBadge) { return errorHandler(res, 500, 'Something went wrong saving the badge'); }
        res.status(201).json({
            success: true,
            badge: savedBadge
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};

/**
 * TODO: 
 * @desc  Get badge cards information based on id
 * @route GET api/achievement/badges?all=false&id=1&id=2...
 * @access  Public
 * @detail  if key `all` is set to true, return all badges 
 * @format  req.params: { all: true } or 
 *                      { all: false, badges: [1,2,...] } or { badges: [1,2,...] }
 *          res.data: { 
 *              length: number,
 *              badges: [{ _id, title, description, imageURI, requirement }...] 
 *          }
 */
exports.getBadges = async (req, res, next) => {
    try {
        var badges;
        if (req.query.all === 'true') {
            badges = await Badge.find();
        }
        else {
            const badgeIds = req.query.id;
            badges = await Badge.find({ _id: { $in: badgeIds } });
        }
        const length = badges ? badges.length : 0;
        return res.status(200).json({
            length,
            badges
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};
/**
 * TODO: imageURI should be a file, will change
 * @desc  Update an existing badge
 * @route PATCH api/achievement/badges/:badgeId
 * @access  Private
 * @detail  only system admins can do this
 * @format  req.body: { badge: { title | description | imageURI | requirement } }
 *          res.data: { 
 *              success: true,
 *              badge: { _id, title, description, imageURI, requirement } 
 *          }
 */
exports.updateBadge = async (req, res, next) => {
    try {
        if (!req.body.badge) { return errorHandler(res, 400, 'Invalid payload'); }

        const { title, description, imageURI, requirement } = req.body.badge;

        const target = nonNullJson({ title, description, imageURI, requirement });

        const updatedBadge = await Badge.findByIdAndUpdate(req.params.badgeId,
            { $set: target }, { new: true });
        if (!updatedBadge) { return errorHandler(res, 404, 'Badge not found'); }

        return res.status(200).json({
            success: true,
            badge: updatedBadge
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};