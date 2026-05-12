const express = require("express");
const router = express.Router();
const {
  getBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
} = require("../controllers/bookingController");

router.get("/", getBookings);
router.get("/:id", getBookingById);
router.post("/", createBooking);
router.patch("/:id/status", updateBookingStatus);

module.exports = router;