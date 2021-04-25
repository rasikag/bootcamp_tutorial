const express = require("express");

const {
  addSubscribe,
  deleteSubscriber,
} = require("../controllers/subscribers");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router.route("/").post(protect, authorize("user"), addSubscribe);

router.route("/:id").delete(protect, authorize("user"), deleteSubscriber);

module.exports = router;
