const Platform = require('../models/Platform');

// TODO: modify this sample later 
// @desc    Get all platforms
// @route   GET /api/platforms
// @access  Public
exports.getPlatforms = async (req, res, next) => {
  try {
    const platforms = await Platform.find();

    return res.status(200).json({
      success: true,
      count: quizzes.length,
      data: platforms
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
}

// TODO: modify this sample later 
// @desc    Add platform
// @route   POST /api/platforms
// @access  Public
exports.addPlatform = async (req, res, next) => {
  try {
    const { name } = req.body;

    const platform = await Platform.create(req.body);
  
    return res.status(201).json({
      success: true,
      data: platform
    }); 
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        msg: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        msg: 'Server Error'
      });
    }
  }
}

// TODO: modify this sample later 
// @desc    Delete platform
// @route   DELETE /api/platform/:id
// @access  Public
exports.deletePlatform = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);

    if(!platform) {
      return res.status(404).json({
        success: false,
        msg: 'No platform found'
      });
    }

    await platform.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
}