import "antd/dist/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import  ProtectedRoute  from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Doctor from "./pages/Doctor";
import Notifications from "./pages/Notifications";
import UsersList from "./pages/Admin/UsersList";
import DoctorsList from "./pages/Admin/DoctorsList";
import Profile from './pages/DoctorProfile/Profile'


function App() {
  const loading = useSelector((state) => state.alerts.loading);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/apply-doctor" element={<ProtectedRoute><Doctor /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/admin/userslist" element={ <ProtectedRoute> <UsersList /> </ProtectedRoute> } />
        <Route path="/admin/doctorslist" element={ <ProtectedRoute> <DoctorsList /> </ProtectedRoute> } />
        <Route path="/doctor/profile/:userID" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
