# MedBook — Patient Appointment Booking

A lightweight appointment booking system with a patient-facing booking flow and a physician/admin portal for managing bookings.

## What I built

MedBook is a small full-stack appointment booking application with two connected experiences:

- A patient booking flow where users select a physician, pick an available time slot, enter their information and visit reason, review the details, and submit a booking request.
- A physician/admin portal where staff can view bookings, filter by physician or status, and update booking states from pending to confirmed or cancelled.

The application is intentionally scoped to focus on the core booking workflow, clear UI state management, and a simple API contract rather than production infrastructure.

## How to run the project

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm run install:all
```

This installs dependencies for both the frontend and backend projects.

### Start the app in development

```bash
npm run dev
```

This starts both apps concurrently:

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:4000 |

The frontend uses Vite proxying for `/api` requests, so the React app can communicate with the Express backend in development without separate CORS configuration.

## Tech stack

| Layer | Technology |
|------|------------|
| Frontend | React 18, Vite |
| Backend | Node.js, Express |
| Data | In-memory mock store |

No database, authentication, or external integrations are included by design to keep the implementation lightweight and easy to review.

## Project structure

```text
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

## API endpoints

### Physicians

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/physicians | List all physicians |
| GET | /api/physicians/:id | Get a single physician |
| GET | /api/physicians/:id/slots | Get available slots for the next 14 days |

### Bookings

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/bookings | List all bookings, with optional filters |
| GET | /api/bookings/:id | Get a single booking |
| POST | /api/bookings | Create a new booking |
| PATCH | /api/bookings/:id/status | Update booking status |

`GET /api/bookings` supports optional query parameters such as `?status=pending` and `?physicianId=p1`.

`POST /api/bookings` expects a payload like:

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

## Key technical and product decisions

- In-memory data store: The app uses mutable mock data instead of a database so the core booking flow can be demonstrated quickly without persistence setup. This keeps the project easy to run, but bookings reset on server restart.
- Generated appointment slots: Available slots are created dynamically from physician working days plus simulated gaps. This gives the UI realistic scheduling behavior without needing a real calendar provider.
- Centralized booking-flow logic: `useBookingFlow.js` owns wizard state, validation, and transitions so presentational components stay simple and easier to test.
- Centralized API layer: All frontend network calls live in `frontend/src/data/api.js`, which reduces coupling and makes backend changes easier to absorb.
- Focused product scope: Authentication, notifications, payment, and deployment concerns were deliberately left out so the implementation could stay centered on the booking experience and admin workflow.

## What I would improve with more time

- Add persistent storage with a real database such as PostgreSQL and an ORM like Prisma.
- Introduce authentication and role-based access for patients and clinic staff.
- Replace simulated slot generation with real calendar availability and conflict handling.
- Add server-side validation, stronger error states, and automated tests across the API and UI.
- Improve the admin portal with pagination, search, audit history, and richer booking details.
- Prepare the app for production with environment-based configuration, logging, and deployment setup.

## What's intentionally not included

- Authentication or session management
- Real calendar integration
- Email notifications
- Payment or insurance logic
- Persistent database
- Production deployment configuration
