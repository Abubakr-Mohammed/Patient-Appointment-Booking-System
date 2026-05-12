import { useEffect, useState } from "react";
import { getBookings, getPhysicians, updateBookingStatus } from "../data/api";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { AVATAR_COLORS } from "../data/constants";

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [physicians, setPhysicians] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [physicianFilter, setPhysicianFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getBookings(), getPhysicians()])
      .then(([b, p]) => { setBookings(b); setPhysicians(p); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(bookingId, newStatus) {
    try {
      const updated = await updateBookingStatus(bookingId, newStatus);
      setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    } catch (e) {
      console.error("Failed to update status", e);
    }
  }

  const filtered = bookings.filter((b) => {
    const statusOk = statusFilter === "all" || b.status === statusFilter;
    const physicianOk = physicianFilter === "all" || b.physicianId === physicianFilter;
    return statusOk && physicianOk;
  });

  const counts = {
    pending:   bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 28, color: "#1C2B3A", margin: "0 0 4px", fontWeight: 700 }}>
          Physician Portal
        </h1>
        <p style={{ color: "#5C6B7A", fontSize: 14, margin: 0 }}>Manage and update appointment bookings.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
        {[
          ["Pending review", counts.pending,   "#FFF8E1", "#8D6214", "#F9C940"],
          ["Confirmed",      counts.confirmed,  "#E8F5E9", "#2E6B34", "#66BB6A"],
          ["Cancelled",      counts.cancelled,  "#FDECEA", "#8B2315", "#EF9E9E"],
        ].map(([label, count, bg, tc, bc]) => (
          <div key={label} style={{ background: bg, border: `1px solid ${bc}`, borderRadius: 10, padding: "1rem", textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: tc, lineHeight: 1 }}>{count}</div>
            <div style={{ fontSize: 12, color: tc, marginTop: 4, fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: "1rem", flexWrap: "wrap" }}>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={selectStyle}>
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select value={physicianFilter} onChange={(e) => setPhysicianFilter(e.target.value)} style={selectStyle}>
          <option value="all">All physicians</option>
          {physicians.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <span style={{ fontSize: 13, color: "#8A9BAA", alignSelf: "center" }}>
          {filtered.length} booking{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Booking cards */}
      {loading && (
        <div style={{ padding: "2rem", textAlign: "center", color: "#8A9BAA" }}>Loading bookings…</div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {!loading && filtered.length === 0 && (
          <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #DDD5C5", padding: "2rem", textAlign: "center", color: "#8A9BAA" }}>
            No bookings match the current filters.
          </div>
        )}

        {filtered.map((b) => {
          const ph = physicians.find((p) => p.id === b.physicianId);
          const phIndex = ph ? physicians.indexOf(ph) : 0;
          const [bg, tc] = AVATAR_COLORS[phIndex % AVATAR_COLORS.length];

          return (
            <div key={b.id} style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #DDD5C5", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "flex-start", padding: "1rem 1.25rem", gap: 14 }}>
                <Avatar initials={ph?.avatar || "??"} size={40} color={bg} textColor={tc} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#1C2B3A" }}>{b.patientName}</span>
                    <Badge status={b.status} />
                    <span style={{ fontSize: 12, color: "#8A9BAA", marginLeft: "auto" }}>#{b.id}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#5C6B7A", marginBottom: 6 }}>
                    <span style={{ color: "#1C2B3A", fontWeight: 600 }}>{b.physicianName}</span>
                    <span style={{ color: "#C8A96A", fontWeight: 700 }}> · {b.dateStr} at {b.time}</span>
                  </div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, color: "#5C6B7A" }}>
                    <span>📋 {b.reason}</span>
                    <span>✉ {b.patientEmail}</span>
                    <span>📞 {b.patientPhone}</span>
                  </div>
                  {b.notes && (
                    <div style={{ marginTop: 6, fontSize: 12, color: "#7A8B9A", fontStyle: "italic", borderLeft: "3px solid #DDD5C5", paddingLeft: 8 }}>
                      "{b.notes}"
                    </div>
                  )}
                </div>
              </div>

              {/* Action bar */}
              <div style={{ borderTop: "1px solid #EEE8DC", padding: "8px 1.25rem", display: "flex", gap: 8, background: "#FAFAF7" }}>
                <span style={{ fontSize: 12, color: "#8A9BAA", alignSelf: "center", marginRight: "auto" }}>
                  Submitted {b.createdAt}
                </span>
                {b.status !== "confirmed" && (
                  <button onClick={() => handleStatusChange(b.id, "confirmed")} style={{ ...actionBtn, borderColor: "#66BB6A", color: "#2E6B34" }}>
                    ✓ Confirm
                  </button>
                )}
                {b.status !== "pending" && b.status !== "cancelled" && (
                  <button onClick={() => handleStatusChange(b.id, "pending")} style={{ ...actionBtn, borderColor: "#F9C940", color: "#8D6214" }}>
                    ⏳ Pending
                  </button>
                )}
                {b.status !== "cancelled" && (
                  <button onClick={() => handleStatusChange(b.id, "cancelled")} style={{ ...actionBtn, borderColor: "#EF9E9E", color: "#8B2315" }}>
                    ✕ Cancel
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const selectStyle = {
  padding: "7px 12px", borderRadius: 8, border: "1.5px solid #DDD5C5",
  fontSize: 13, fontFamily: "inherit", background: "#fff", color: "#1C2B3A", cursor: "pointer",
};

const actionBtn = {
  padding: "5px 14px", borderRadius: 6, border: "1.5px solid",
  background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 700,
};