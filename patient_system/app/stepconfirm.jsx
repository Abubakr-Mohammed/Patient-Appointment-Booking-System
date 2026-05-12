export default function StepConfirm({ physician, slot, time, form, submitting, onBack, onSubmit }) {
    const rows = [
      ["Physician",     physician?.name],
      ["Specialty",     physician?.specialty],
      ["Patient",       form.name],
      ["Email",         form.email],
      ["Phone",         form.phone],
      ["Date of birth", form.dob || "—"],
      ["Reason",        form.reason],
    ];
  
    return (
      <div>
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            border: "1.5px solid #DDD5C5",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{ background: "#1C2B3A", padding: "1rem 1.5rem" }}>
            <p style={{ color: "#C8A96A", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 2px", fontWeight: 700 }}>
              Appointment Summary
            </p>
            <p style={{ color: "#F0EAD6", fontSize: 20, fontWeight: 700, margin: 0 }}>
              {slot?.dateStr} at {time}
            </p>
          </div>
  
          {/* Fields */}
          <div style={{ padding: "1.25rem 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {rows.map(([label, val]) => (
              <div key={label} style={{ gridColumn: label === "Reason" ? "1 / -1" : "auto" }}>
                <p style={{ color: "#8A9BAA", fontSize: 12, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                  {label}
                </p>
                <p style={{ color: "#1C2B3A", fontSize: 14, margin: 0, fontWeight: label === "Physician" || label === "Reason" ? 700 : 400 }}>
                  {val}
                </p>
              </div>
            ))}
            {form.notes && (
              <div style={{ gridColumn: "1 / -1" }}>
                <p style={{ color: "#8A9BAA", fontSize: 12, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                  Notes
                </p>
                <p style={{ color: "#1C2B3A", fontSize: 14, margin: 0, fontStyle: "italic" }}>{form.notes}</p>
              </div>
            )}
          </div>
  
          {/* Status note */}
          <div style={{ background: "#FFF8E6", borderTop: "1.5px solid #F0DFA0", padding: "10px 1.5rem" }}>
            <p style={{ color: "#7A5C0A", fontSize: 13, margin: 0 }}>
              ⏳ Your request will be submitted as <strong>Pending</strong> and confirmed by the clinic within 1 business day.
            </p>
          </div>
        </div>
  
        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
          <button onClick={onBack} disabled={submitting} style={backBtnStyle}>← Back</button>
          <button onClick={onSubmit} disabled={submitting} style={submitBtnStyle}>
            {submitting ? "Submitting…" : "Submit Request ✓"}
          </button>
        </div>
      </div>
    );
  }
  
  const backBtnStyle = {
    padding: "10px 20px", borderRadius: 8,
    border: "1.5px solid #DDD5C5", background: "transparent",
    cursor: "pointer", color: "#5C6B7A", fontSize: 14, fontFamily: "inherit",
  };
  
  const submitBtnStyle = {
    padding: "10px 32px", borderRadius: 8, border: "none",
    background: "#C8A96A", color: "#1C2B3A",
    cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: "inherit",
  };