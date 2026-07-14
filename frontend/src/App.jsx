import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ConnectionPage from "./pages/ConnectionPage";
import RecoveryPage from "./pages/RecoveryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConnectionPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
    path="/recovery"
    element={<RecoveryPage />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;