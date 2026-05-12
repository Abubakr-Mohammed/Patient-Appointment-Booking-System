# MedBook — Patient Appointment Booking

A lightweight appointment booking system with a patient-facing booking flow and a physician/admin portal for managing bookings.

---

## What it does

**Patient flow** — patients pick a physician, choose an available time slot, fill in their details and reason for visit, review, and submit a booking request.

**Physician portal** — staff can see all bookings, filter by status or physician, and update each booking's status (pending → confirmed or cancelled).

Booking statuses: `pending` · `confirmed` · `cancelled`

---

## Tech stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, Vite                    |
| Backend  | Node.js, Express                  |
| Data     | In-memory mock store (no database)|

No database, no authentication, no external services — intentionally lightweight.

---

## Project structure

```
medbook/
├── package.json            ← root scripts to run both apps together
│
├── backend/
│   ├── package.json
│   └── src/
│       ├── index.js                  ← Express app entry point
│       ├── data/
│       │   └── mockData.js           ← in-memory physicians + bookings
│       ├── controllers/
│       │   ├── physicianController.js
│       │   └── bookingController.js
│       ├── routes/
│       │   ├── physicians.js
│       │   └── bookings.js
│       └── middleware/
│           └── errorHandler.js
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx                  ← React entry point
        ├── App.jsx                   ← top-level routing (patient vs admin)
        ├── data/
        │   ├── api.js                ← all fetch calls to the backend
        │   └── constants.js          ← shared enums and style tokens
        ├── hooks/
        │   └── useBookingFlow.js     ← all patient wizard state + logic
        ├── components/
        │   ├── Header.jsx
        │   ├── Badge.jsx
        │   ├── Avatar.jsx
        │   ├── StepProgress.jsx
        │   ├── StepPhysician.jsx
        │   ├── StepTimeSlot.jsx
        │   ├── StepPatientDetails.jsx
        │   ├── StepConfirm.jsx
        │   └── BookingSuccess.jsx
        ├── pages/
        │   ├── PatientPage.jsx       ← assembles the booking wizard
        │   └── AdminPage.jsx         ← physician/admin dashboard
        └── styles/
            └── global.css
```

---

## Getting started

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm run install:all
```

This installs packages for both `backend/` and `frontend/`.

### Run in development

```bash
npm run dev
```

This starts both servers concurrently:

| App      | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:5173       |
| Backend  | http://localhost:4000       |

Vite proxies all `/api` requests from the frontend to the backend, so there are no CORS issues during development.

---

## API endpoints

### Physicians

| Method | Path                          | Description                        |
|--------|-------------------------------|------------------------------------|
| GET    | `/api/physicians`             | List all physicians                |
| GET    | `/api/physicians/:id`         | Get a single physician             |
| GET    | `/api/physicians/:id/slots`   | Get available slots (next 14 days) |

### Bookings

| Method | Path                          | Description                        |
|--------|-------------------------------|------------------------------------|
| GET    | `/api/bookings`               | List all bookings (filterable)     |
| GET    | `/api/bookings/:id`           | Get a single booking               |
| POST   | `/api/bookings`               | Create a new booking               |
| PATCH  | `/api/bookings/:id/status`    | Update booking status              |

**GET /api/bookings** supports optional query parameters:
- `?status=pending` — filter by status
- `?physicianId=p1` — filter by physician

**POST /api/bookings** required body fields:
```json
{
  "physicianId": "p1",
  "patientName": "Jane Smith",
  "patientEmail": "jane@email.com",
  "patientPhone": "416-555-0100",
  "dateStr": "Mon, May 19",
  "time": "10:00 AM",
  "reason": "Annual check-up / physical"
}
```

---

## Key design decisions

**In-memory data store** — `mockData.js` exports mutable arrays that controllers read and write to directly. This means data resets when the server restarts. Swapping in a real database (e.g. PostgreSQL via Prisma) would only require changes to the controller files — the route and frontend layers don't need to change.

**Slot generation** — available time slots are generated on request by the `/slots` endpoint, using the physician's working days and random availability gaps to simulate a real calendar. In production this would query a scheduling system.

**Custom hook for booking state** — `useBookingFlow.js` owns all wizard state (current step, selected physician, form values, validation). Pages and components stay thin — they receive data and callbacks as props. This makes each step independently testable.

**API layer in one file** — all `fetch` calls live in `frontend/src/data/api.js`. If the backend URL or shape changes, there's one place to update it.

---

## What's not included (intentional)

- Authentication / session management
- Real calendar integration
- Email notifications
- Payment or insurance logic
- Persistent database
- Production deployment configuration
