const { bookings, physicians } = require("../data/mockData");

const VALID_STATUSES = ["pending", "confirmed", "cancelled"];

const VALID_REASONS = [
  "Annual check-up / physical",
  "Follow-up appointment",
  "New symptom or concern",
  "Prescription refill",
  "Lab results review",
  "Specialist referral",
  "Mental health support",
  "Other",
];

/**
 * GET /api/bookings
 * Returns all bookings. Supports optional query filters:
 *   ?status=pending|confirmed|cancelled
 *   ?physicianId=p1
 */
function getBookings(req, res) {
  let result = [...bookings];

  if (req.query.status && VALID_STATUSES.includes(req.query.status)) {
    result = result.filter((b) => b.status === req.query.status);
  }

  if (req.query.physicianId) {
    result = result.filter((b) => b.physicianId === req.query.physicianId);
  }

  res.json(result);
}

/**
 * GET /api/bookings/:id
 * Returns a single booking by ID.
 */
function getBookingById(req, res) {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  res.json(booking);
}

/**
 * POST /api/bookings
 * Creates a new booking. All new bookings start with status "pending".
 * Required body fields: physicianId, patientName, patientEmail, patientPhone,
 *                       dateStr, time, reason
 * Optional: notes, patientDob
 */
function createBooking(req, res) {
  const {
    physicianId,
    patientName,
    patientEmail,
    patientPhone,
    patientDob,
    dateStr,
    time,
    reason,
    notes,
  } = req.body;

  // Validate required fields
  const errors = {};
  if (!physicianId) errors.physicianId = "Physician is required";
  if (!patientName || !patientName.trim()) errors.patientName = "Patient name is required";
  if (!patientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail))
    errors.patientEmail = "Valid email is required";
  if (!patientPhone || !patientPhone.trim()) errors.patientPhone = "Phone number is required";
  if (!dateStr) errors.dateStr = "Appointment date is required";
  if (!time) errors.time = "Appointment time is required";
  if (!reason || !VALID_REASONS.includes(reason)) errors.reason = "Valid reason for visit is required";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const physician = physicians.find((p) => p.id === physicianId);
  if (!physician) {
    return res.status(400).json({ errors: { physicianId: "Physician not found" } });
  }

  const newBooking = {
    id: "b" + Date.now(),
    physicianId,
    physicianName: physician.name,
    patientName: patientName.trim(),
    patientEmail: patientEmail.trim().toLowerCase(),
    patientPhone: patientPhone.trim(),
    patientDob: patientDob || null,
    dateStr,
    time,
    reason,
    notes: notes ? notes.trim() : "",
    status: "pending",
    createdAt: new Date().toISOString().slice(0, 10),
  };

  bookings.unshift(newBooking);
  res.status(201).json(newBooking);
}

/**
 * PATCH /api/bookings/:id/status
 * Updates the status of an existing booking.
 * Required body: { status: "pending" | "confirmed" | "cancelled" }
 */
function updateBookingStatus(req, res) {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  const { status } = req.body;
  if (!status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: `Status must be one of: ${VALID_STATUSES.join(", ")}`,
    });
  }

  booking.status = status;
  res.json(booking);
}

module.exports = { getBookings, getBookingById, createBooking, updateBookingStatus };