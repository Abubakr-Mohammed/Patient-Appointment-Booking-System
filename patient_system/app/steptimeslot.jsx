export default function StepTimeSlot({
    slots,
    loading,
    selectedSlot,
    selectedTime,
    onSelectTime,
    onBack,
    onNext,
  }) {
    if (loading) {
      return (
        <div style={{ padding: "2rem", background: "#fff", borderRadius: 12, textAlign: "center", color: "#5C6B7A" }}>
          Loading available slots…
        </div>
      );
    }
  
    if (!loading && slots.length === 0) {
      return (
        <>
          <div style={{ padding: "2rem", background: "#fff", borderRadius: 12, textAlign: "center", color: "#5C6B7A" }}>
            No available slots in the next 2 weeks.
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <button onClick={onBack} style={backBtnStyle}>← Back</button>
          </div>
        </>
      );
    }
  
    const canProceed = selectedSlot && selectedTime;
  
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {slots.map((slot, si) => (
            <div
              key={si}
              style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #DDD5C5", overflow: "hidden" }}
            >
              <div style={{ background: "#1C2B3A", padding: "10px 16px" }}>
                <span style={{ color: "#C8A96A", fontWeight: 700, fontSize: 14 }}>{slot.dateStr}</span>
              </div>
              <div style={{ padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                {slot.times.map((t) => {
                  const sel = selectedSlot === slot && selectedTime === t;
                  return (
                    <button
                      key={t}
                      onClick={() => onSelectTime(slot, t)}
                      style={{
                        padding: "6px 16px",
                        borderRadius: 8,
                        border: `1.5px solid ${sel ? "#1C2B3A" : "#DDD5C5"}`,
                        background: sel ? "#1C2B3A" : "#F7F4EF",
                        color: sel ? "#C8A96A" : "#3C4D5A",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: sel ? 700 : 400,
                        fontFamily: "inherit",
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
  
        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
          <button onClick={onBack} style={backBtnStyle}>← Back</button>
          <button
            onClick={() => canProceed && onNext()}
            style={{
              padding: "10px 28px",
              borderRadius: 8,
              border: "none",
              background: canProceed ? "#1C2B3A" : "#C8C0B0",
              color: canProceed ? "#F0EAD6" : "#A09080",
              cursor: canProceed ? "pointer" : "not-allowed",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "inherit",
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }
  
  const backBtnStyle = {
    padding: "10px 20px",
    borderRadius: 8,
    border: "1.5px solid #DDD5C5",
    background: "transparent",
    cursor: "pointer",
    color: "#5C6B7A",
    fontSize: 14,
    fontFamily: "inherit",
  };