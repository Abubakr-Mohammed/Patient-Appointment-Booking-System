export default function BookingSuccess({ physician, slot, time, email, onBookAnother, onViewAdmin }) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <div
          style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "#E8F5E9", border: "3px solid #66BB6A",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.5rem", fontSize: 32,
          }}
        >
          ✓
        </div>
        <h2 style={{ color: "#1C2B3A", fontFamily: "'Georgia', serif", fontSize: 26, marginBottom: 8 }}>
          Request submitted!
        </h2>
        <p style={{ color: "#5C6B7A", fontSize: 15, marginBottom: "0.5rem" }}>
          Your appointment request with <strong>{physician?.name}</strong> on{" "}
          <strong>{slot?.dateStr}</strong> at <strong>{time}</strong> has been received.
        </p>
        <p style={{ color: "#5C6B7A", fontSize: 14, marginBottom: "2rem" }}>
          The clinic will confirm within 1 business day. You'll be notified at{" "}
          <strong>{email}</strong>.
        </p>
        <div style={{ display: "inline-flex", gap: 12 }}>
          <button onClick={onBookAnother} style={secondaryBtnStyle}>Book another</button>
          <button onClick={onViewAdmin} style={primaryBtnStyle}>View in admin portal →</button>
        </div>
      </div>
    );
  }
  
  const primaryBtnStyle = {
    padding: "10px 24px", borderRadius: 8, border: "none",
    background: "#1C2B3A", color: "#F0EAD6",
    cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600,
  };
  
  const secondaryBtnStyle = {
    padding: "10px 24px", borderRadius: 8,
    border: "1.5px solid #DDD5C5", background: "transparent",
    cursor: "pointer", fontFamily: "inherit", color: "#3C4D5A", fontSize: 14, fontWeight: 600,
  };