const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// Physicians
export const getPhysicians = () => request("/physicians");
export const getPhysicianSlots = (physicianId) =>
  request(`/physicians/${physicianId}/slots`);

// Bookings
export const getBookings = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return request(`/bookings${params ? `?${params}` : ""}`);
};

export const createBooking = (payload) =>
  request("/bookings", { method: "POST", body: JSON.stringify(payload) });

export const updateBookingStatus = (bookingId, status) =>
  request(`/bookings/${bookingId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });