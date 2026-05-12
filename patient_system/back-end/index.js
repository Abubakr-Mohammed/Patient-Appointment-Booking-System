const express = require("express");
const cors = require("cors");
const physicianRoutes = require("./routes/physicians");
const bookingRoutes = require("./routes/bookings");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/physicians", physicianRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`MedBook API running on http://localhost:${PORT}`);
});

module.exports = app;