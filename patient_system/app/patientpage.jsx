import { useEffect, useState } from "react";
import { getPhysicians } from "../data/api";
import { useBookingFlow } from "../hooks/useBookingFlow";
import StepProgress from "../components/StepProgress";
import StepPhysician from "../components/StepPhysician";
import StepTimeSlot from "../components/StepTimeSlot";
import StepPatientDetails from "../components/StepPatientDetails";
import StepConfirm from "../components/StepConfirm";
import BookingSuccess from "../components/BookingSuccess";

const STEP_META = [
  { title: "Choose your physician",   subtitle: "Select a physician to see their availability." },
  { title: "Select a time",           subtitle: (name) => `Showing available slots for ${name}.` },
  { title: "Your details",            subtitle: "Please fill in your information." },
  { title: "Confirm booking",         subtitle: "Review and submit your appointment request." },
];

export default function PatientPage({ onGoToAdmin }) {
  const [physicians, setPhysicians] = useState([]);
  const flow = useBookingFlow();

  useEffect(() => {
    getPhysicians().then(setPhysicians).catch(console.error);
  }, []);

  const meta = STEP_META[flow.step - 1];

  return (
    <div>
      {flow.step < 5 && (
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 28, color: "#1C2B3A", margin: "0 0 6px", fontWeight: 700 }}>
            {meta?.title}
          </h1>
          <p style={{ color: "#5C6B7A", fontSize: 14, margin: "0 0 1.5rem" }}>
            {typeof meta?.subtitle === "function"
              ? meta.subtitle(flow.selectedPhysician?.name)
              : meta?.subtitle}
          </p>
          <StepProgress step={flow.step} />
        </div>
      )}

      {flow.step === 1 && (
        <StepPhysician
          physicians={physicians}
          selected={flow.selectedPhysician}
          onSelect={flow.choosePhysician}
          onNext={() => flow.setStep(2)}
        />
      )}

      {flow.step === 2 && (
        <StepTimeSlot
          slots={flow.slots}
          loading={flow.slotsLoading}
          selectedSlot={flow.selectedSlot}
          selectedTime={flow.selectedTime}
          onSelectTime={(slot, time) => {
            flow.setSelectedSlot(slot);
            flow.setSelectedTime(time);
          }}
          onBack={() => flow.setStep(1)}
          onNext={() => flow.setStep(3)}
        />
      )}

      {flow.step === 3 && (
        <StepPatientDetails
          form={flow.form}
          errors={flow.formErrors}
          onChange={flow.updateForm}
          onBack={() => flow.setStep(2)}
          onNext={() => flow.setStep(4)}
        />
      )}

      {flow.step === 4 && (
        <StepConfirm
          physician={flow.selectedPhysician}
          slot={flow.selectedSlot}
          time={flow.selectedTime}
          form={flow.form}
          submitting={flow.submitting}
          onBack={() => flow.setStep(3)}
          onSubmit={flow.submit}
        />
      )}

      {flow.step === 5 && (
        <BookingSuccess
          physician={flow.selectedPhysician}
          slot={flow.selectedSlot}
          time={flow.selectedTime}
          email={flow.form.email}
          onBookAnother={flow.reset}
          onViewAdmin={onGoToAdmin}
        />
      )}
    </div>
  );
}