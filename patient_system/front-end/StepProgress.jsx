const STEPS = ["Physician", "Time", "Details", "Confirm"];

export default function StepProgress({ step }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "2rem" }}>
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: done ? "#C8A96A" : active ? "#1C2B3A" : "#E2D9C8",
                  color: done || active ? "#fff" : "#8A9BAA",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {done ? "✓" : n}
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: active ? "#1C2B3A" : "#8A9BAA",
                  fontWeight: active ? 700 : 400,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: done ? "#C8A96A" : "#E2D9C8",
                  marginBottom: 18,
                  marginLeft: -2,
                  marginRight: -2,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}