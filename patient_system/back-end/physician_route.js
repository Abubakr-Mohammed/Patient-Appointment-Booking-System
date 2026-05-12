const express = require("express");
const router = express.Router();
const {
  getPhysicians,
  getPhysicianById,
  getPhysicianSlots,
} = require("../controllers/physicianController");

router.get("/", getPhysicians);
router.get("/:id", getPhysicianById);
router.get("/:id/slots", getPhysicianSlots);

module.exports = router;