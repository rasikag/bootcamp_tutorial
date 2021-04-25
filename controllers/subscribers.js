const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Subscriber = require("../models/Subscriber");
const Bootcamp = require("../models/Bootcamp");
const Review = require("../models/Review");

exports.getSubscribes = asyncHandler(async (req, res, next) => {
  const reviews = await Subscriber.find({ user: req.user.id });

  return res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});

exports.addSubscribe = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  console.log(bootcamp);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with the id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  const subscriber = await Subscriber.create(req.body);

  res.status(201).json({
    success: true,
    data: subscriber,
  });
});

exports.deleteSubscriber = asyncHandler(async (req, res, next) => {
  const subscriber = await Subscriber.findById(req.params.id);

  if (!subscriber) {
    return next(
      new ErrorResponse(`No subscribe with the id of ${req.params.id}`, 404)
    );
  }

  if (subscriber.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`Not authorized to update subscribe details`, 401)
    );
  }

  await subscriber.remove();

  const reviews = await Review.find({ user: req.user.id });

  const reviewIds = reviews.map((x) => x._id);

  await Review.remove({ id: { $in: reviewIds.map(mongoose.Types.ObjectId) } });

  res.status(200).json({
    success: true,
    data: {},
  });
});
