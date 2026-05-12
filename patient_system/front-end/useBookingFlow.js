import { useState, useMemo } from "react";
import { getPhysicianSlots, createBooking } from "../data/api";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  reason: "",
  notes: "",
};

export function useBookingFlow() {
  const [step, setStep] = useState(1);
  const [selectedPhysician, setSelectedPhysician] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  function validateForm() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email address required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.reason) errs.reason = "Please select a reason for visit";
    return errs;
  }

  async function choosePhysician(physician) {
    setSelectedPhysician(physician);
    setSlotsLoading(true);
    setSlots([]);
    try {
      const data = await getPhysicianSlots(physician.id);
      setSlots(data);
    } catch (e) {
      console.error("Failed to load slots", e);
    } finally {
      setSlotsLoading(false);
    }
  }

  function goToStep(n) {
    const errs = n > 3 && step === 3 ? validateForm() : {};
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setStep(n);
  }

  async function submit() {
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const booking = await createBooking({
        physicianId: selectedPhysician.id,
        patientName: form.name,
        patientEmail: form.email,
        patientPhone: form.phone,
        patientDob: form.dob || undefined,
        dateStr: selectedSlot.dateStr,
        time: selectedTime,
        reason: form.reason,
        notes: form.notes,
      });
      setSubmittedBooking(booking);
      setStep(5);
    } catch (err) {
      console.error("Booking failed", err);
      if (err.errors) setFormErrors(err.errors);
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep(1);
    setSelectedPhysician(null);
    setSlots([]);
    setSelectedSlot(null);
    setSelectedTime(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setSubmittedBooking(null);
  }

  function updateForm(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  return {
    step, setStep: goToStep,
    selectedPhysician, choosePhysician,
    slots, slotsLoading,
    selectedSlot, setSelectedSlot,
    selectedTime, setSelectedTime,
    form, updateForm, formErrors,
    submitting, submit,
    submittedBooking,
    reset,
  };
}