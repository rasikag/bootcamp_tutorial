const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema({
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


SubscriberSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Subscriber', SubscriberSchema);
