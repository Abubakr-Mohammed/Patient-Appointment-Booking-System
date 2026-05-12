import Avatar from "./Avatar";
import { AVATAR_COLORS } from "../data/constants";

export default function StepPhysician({ physicians, selected, onSelect, onNext }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {physicians.map((ph, i) => {
          const [bg, tc] = AVATAR_COLORS[i % AVATAR_COLORS.length];
          const sel = selected?.id === ph.id;
          return (
            <button
              key={ph.id}
              onClick={() => onSelect(ph)}
              style={{
                background: sel ? "#1C2B3A" : "#fff",
                border: `2px solid ${sel ? "#C8A96A" : "#DDD5C5"}`,
                borderRadius: 12,
                padding: "1.25rem",
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <Avatar
                initials={ph.avatar}
                color={sel ? "#C8A96A22" : bg}
                textColor={sel ? "#C8A96A" : tc}
              />
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: sel ? "#F0EAD6" : "#1C2B3A", marginBottom: 2 }}>
                  {ph.name}
                </div>
                <div style={{ fontSize: 12, color: sel ? "#C8A96A" : "#7A8B9A", fontStyle: "italic", marginBottom: 8 }}>
                  {ph.specialty}
                </div>
                <div style={{ fontSize: 12, color: sel ? "#B8C8D4" : "#5C6B7A", lineHeight: 1.5 }}>
                  {ph.bio}
                </div>
                <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {ph.workingDays.map((d) => (
                    <span
                      key={d}
                      style={{
                        fontSize: 11,
                        padding: "2px 8px",
                        borderRadius: 20,
                        background: sel ? "#2E4055" : "#F0EAD6",
                        color: sel ? "#C8A96A" : "#6B5A3A",
                        fontWeight: 600,
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => selected && onNext()}
          style={{
            padding: "10px 28px",
            borderRadius: 8,
            border: "none",
            background: selected ? "#1C2B3A" : "#C8C0B0",
            color: selected ? "#F0EAD6" : "#A09080",
            cursor: selected ? "pointer" : "not-allowed",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}