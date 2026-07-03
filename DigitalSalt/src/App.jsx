import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPass from "./auth/ForgotPass";
import ResetPass from "./auth/ResetPass";

import DashboardLayout from "./component/DashboardLayout";
import Home from "./pages/Home";

import Books from "./pages/Books";
import Favorites from "./pages/Favorites";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import SearchHistory from "./pages/SearchHistory";
function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/reset-password" element={<ResetPass />} />

      {/* Dashboard Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search-history" element={<SearchHistory />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;