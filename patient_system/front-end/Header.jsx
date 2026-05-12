export default function Header({ view, onNavigate }) {
    return (
      <header
        style={{
          background: "#1C2B3A",
          color: "#F0EAD6",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          borderBottom: "3px solid #C8A96A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "#C8A96A",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#1C2B3A", fontSize: 16, fontWeight: 700 }}>+</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.04em", color: "#F0EAD6" }}>
            MedBook
          </span>
        </div>
  
        <nav style={{ display: "flex", gap: 4 }}>
          {[
            ["patient", "Book Appointment"],
            ["admin", "Physician Portal"],
          ].map(([v, label]) => (
            <button
              key={v}
              onClick={() => onNavigate(v)}
              style={{
                padding: "6px 16px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.03em",
                background: view === v ? "#C8A96A" : "transparent",
                color: view === v ? "#1C2B3A" : "#B8C8D4",
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>
    );
  }