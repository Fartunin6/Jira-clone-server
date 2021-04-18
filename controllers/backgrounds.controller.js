const Background = require('../models/Background');

exports.getBackgrounds = (request, response) => {
  Background.find().exec((error, backgrounds) => {
    if (error || !backgrounds) {
      return response.status(500).json({
        error: 'Finding backgrounds is failed',
      });
    }

    return response.status(200).json({
      total: backgrounds.length,
      data: backgrounds.map((bg) => ({ id: bg._id, color: bg.color })),
    });
  });
};

exports.createBackground = (request, response) => {
  const { color } = request.body;

  const background = new Background({ color });

  background.save((error, background) => {
    if (error || !background) {
      return response.status(500).json({
        error: 'Creating background is failed',
      });
    }

    Background.find().exec((error, backgrounds) => {
      if (error || !background) {
        return response.status(500).json({
          error: 'Finding backgrounds is failed',
        });
      }

      return response.status(200).json({
        data: backgrounds.map((bg) => ({ id: bg._id, color: bg.color })),
      });
    });
  });
};

exports.deleteBackgroundById = (request, response) => {
  const { id } = request.query;

  Background.deleteOne({ _id: id }).exec((error, background) => {
    if (error || !background) {
      return response.status(400).json({
        error: 'Deleting background is failed',
      });
    }

    return response.status(200).json({
      data: background,
    });
  });
};

exports.getBackgroundsByIds = (request, response) => {
  const { ids } = JSON.parse(request.query.filter);

  Background.find()
    .where('_id')
    .in(ids)
    .exec((error, backgrounds) => {
      if (error || !backgrounds) {
        return response.status(400).json({
          error: 'Finding user by id is failed',
        });
      }

      return response.status(200).json({
        data: backgrounds.map((bg) => ({ id: bg._id, ...bg._doc })),
      });
    });
};
