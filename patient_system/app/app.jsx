import { useState } from "react";
import Header from "./components/Header";
import PatientPage from "./pages/PatientPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const [view, setView] = useState("patient");

  return (
    <div style={{ minHeight: "100vh", background: "#F7F4EF" }}>
      <Header view={view} onNavigate={setView} />
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {view === "patient" && (
          <PatientPage onGoToAdmin={() => setView("admin")} />
        )}
        {view === "admin" && <AdminPage />}
      </main>
    </div>
  );
}