import { VISIT_REASONS } from "../data/constants";

export default function StepPatientDetails({ form, errors, onChange, onBack, onNext }) {
  const fields = [
    { key: "name",  label: "Full name",      type: "text",  placeholder: "Jane Smith",        required: true,  full: true },
    { key: "email", label: "Email address",  type: "email", placeholder: "jane@email.com",     required: true  },
    { key: "phone", label: "Phone number",   type: "tel",   placeholder: "416-555-0100",       required: true  },
    { key: "dob",   label: "Date of birth",  type: "date",  placeholder: "",                   required: false },
  ];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: "1.5px solid #DDD5C5",
        padding: "1.5rem",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {fields.map((f) => (
          <div key={f.key} style={{ gridColumn: f.full ? "1 / -1" : "auto" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#3C4D5A", marginBottom: 4 }}>
              {f.label}
              {f.required && <span style={{ color: "#C0392B" }}> *</span>}
            </label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={(e) => onChange(f.key, e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: 8,
                border: `1.5px solid ${errors[f.key] ? "#E74C3C" : "#DDD5C5"}`,
                fontSize: 14,
                fontFamily: "inherit",
                background: "#F7F4EF",
                color: "#1C2B3A",
              }}
            />
            {errors[f.key] && (
              <p style={{ color: "#C0392B", fontSize: 12, marginTop: 3 }}>{errors[f.key]}</p>
            )}
          </div>
        ))}

        {/* Reason for visit */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#3C4D5A", marginBottom: 4 }}>
            Reason for visit <span style={{ color: "#C0392B" }}>*</span>
          </label>
          <select
            value={form.reason}
            onChange={(e) => onChange("reason", e.target.value)}
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: 8,
              border: `1.5px solid ${errors.reason ? "#E74C3C" : "#DDD5C5"}`,
              fontSize: 14,
              fontFamily: "inherit",
              background: "#F7F4EF",
              color: "#1C2B3A",
            }}
          >
            <option value="">Select a reason…</option>
            {VISIT_REASONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {errors.reason && (
            <p style={{ color: "#C0392B", fontSize: 12, marginTop: 3 }}>{errors.reason}</p>
          )}
        </div>

        {/* Notes */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#3C4D5A", marginBottom: 4 }}>
            Additional notes{" "}
            <span style={{ color: "#8A9BAA", fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            rows={3}
            placeholder="Any symptoms, medications, or context that may be helpful…"
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: 8,
              border: "1.5px solid #DDD5C5",
              fontSize: 14,
              fontFamily: "inherit",
              background: "#F7F4EF",
              color: "#1C2B3A",
              resize: "vertical",
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
        <button onClick={onBack} style={backBtnStyle}>← Back</button>
        <button onClick={onNext} style={nextBtnStyle}>Review →</button>
      </div>
    </div>
  );
}

const backBtnStyle = {
  padding: "10px 20px", borderRadius: 8,
  border: "1.5px solid #DDD5C5", background: "transparent",
  cursor: "pointer", color: "#5C6B7A", fontSize: 14, fontFamily: "inherit",
};

const nextBtnStyle = {
  padding: "10px 28px", borderRadius: 8, border: "none",
  background: "#1C2B3A", color: "#F0EAD6",
  cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: "inherit",
};