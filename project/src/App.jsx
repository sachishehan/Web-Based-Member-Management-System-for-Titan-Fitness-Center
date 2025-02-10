/* eslint-disable react/jsx-no-undef */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { MemberProvider } from './contexts/MemberContext';
import { AuthProvider } from './contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Classes from './components/Classes';
import Membership from './components/Membership';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Settings from './components/admin/Settings';
import AdminLogin from './components/auth/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import WorkoutProgress from './pages/WorkoutProgress';
import FitnessGoals from './pages/FitnessGoals';
import ResetPassword from './pages/ResetPassword';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MClasses from './pages/MClasses';
import DMembership from './pages/DMembership';

function App() {
  return (
    <Router>
      <MemberProvider>
        <AuthProvider>
          <div className="min-h-screen">
            <ToastContainer position="top-right" />
            <Routes>
              {/* Website Routes */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Hero />
                    <About />
                    <Classes />
                    <Membership />
                    <Contact />
                    <Footer />
                  </>
                }
              />

              {/* Auth Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<Register/>} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Member Dashboard Routes */}
                <Route
                path="/member"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/member/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="workout-progress" element={<WorkoutProgress />} />
                <Route path='dMember' element={<DMembership/>}/>
                <Route path='classes' element={<MClasses/>}/>
                <Route path="fitness-goals" element={<FitnessGoals />} />
                <Route path="settings" element={<Settings />} />
              </Route>   
  
            
            </Routes>
          </div>
        </AuthProvider>
      </MemberProvider>
    </Router>
  );
}

export default App;