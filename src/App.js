///
import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MedicationPage from "./pages/MedicationPage/MedicationPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AddMedication from "./pages/AddMedication/AddMedication";
import EditMedication from "./pages/EditMedication/EditMedication";
import Footer from "./components/Footer/Footer";
import AddProfile from "./pages/AddProfile/AddProfile";
import EditProfile from "./pages/EditProfile/EditProfile";
import ProfileDetailsPage from "./pages/ProfileDetailsPage/ProfileDetailsPage";
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSession = Cookies.get("session");
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
    setLoading(false);
  }, []);

  const handleLogin = (sessionData) => {
    setSession(sessionData);
    Cookies.set("session", JSON.stringify(sessionData), { expires: 2 });
  };

  const handleLogout = () => {
    setSession(null);
    Cookies.remove("session");
  };

   if (loading) {
     return <div>Loading...</div>; // You can replace this with a spinner or any loading indicator
   }

  return (
    <BrowserRouter>
      <Header onLogout={handleLogout} />
      <div className="route">
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          {session ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/medication/:id" element={<MedicationPage />} />
              <Route
                path="/medication/:patientId/add"
                element={<AddMedication />}
              />
              <Route path="/medication/:id/edit" element={<EditMedication />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/add" element={<AddProfile />} />
              <Route path="/profile/:id/edit" element={<EditProfile />} />
              <Route
                path="/profile/details/:id"
                element={<ProfileDetailsPage />}
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Navbar onLogout={handleLogout} />
      <Footer />
    </BrowserRouter>
  );
}
