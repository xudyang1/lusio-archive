const UserAccount = require("../models/UserAccount");
const { errorHandler } = require("../utils/jsonTool");

exports.suspendUser = async (req, res, next) => {
    try {
        const profileId = req.params.profileId;
        const updatedUser = await UserAccount.findOneAndUpdate({ profile: profileId }, { status: 1 }, { new: true });
        if (!updatedUser)
            return errorHandler(res, 400, 'User not found');
        return res.status(200).json({ success: true, user: updatedUser });
    } catch (err) {
        console.log(err)
        return errorHandler(res, 500, 'Server Error');
    }
};
exports.unSuspendUser = async (req, res, next) => {
    try {
        const profileId = req.params.profileId;
        const updatedUser = await UserAccount.findOneAndUpdate({ profile: profileId }, { status: 0 }, { new: true });
        if (!updatedUser)
            return errorHandler(res, 400, 'User not found');
        return res.status(200).json({ success: true, user: updatedUser });
    } catch (err) {
        return errorHandler(res, 500, 'Server Error');
    }
};