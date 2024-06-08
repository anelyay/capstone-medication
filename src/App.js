import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Scan from "./pages/ScanMedication/ScanMedication";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/medication/:id" element={<MedicationPage />} />
        <Route path="/medication/:patientId/add" element={<AddMedication />} />
        <Route path="/medication/:id/edit" element={<EditMedication />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/add" element={<AddProfile />} />
        <Route path="/profile/:id/edit" element={<EditProfile />} />
        <Route path="/text" element={<Scan />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
