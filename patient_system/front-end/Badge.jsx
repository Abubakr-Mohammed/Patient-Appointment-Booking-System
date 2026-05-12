import { STATUS_COLORS, STATUS_ICONS } from "../data/constants";

export default function Badge({ status }) {
  const c = STATUS_COLORS[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        padding: "2px 10px",
        letterSpacing: "0.02em",
      }}
    >
      <span style={{ fontSize: 11 }}>{STATUS_ICONS[status]}</span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}